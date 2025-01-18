import {
  Typography,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Button,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CreateEventPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState<string>('')
  const [documentUrl, setDocumentUrl] = useState<string>('')
  const { mutateAsync: uploadFile } = useUploadPublic()
  const { mutateAsync: createEvent } = Api.event.create.useMutation()

  const eventCategories = [
    'Conference',
    'Workshop',
    'Networking',
    'Social',
    'Tech Talk',
    'Hackathon',
    'Other',
  ]

  const targetAudiences = [
    'Developers',
    'Designers',
    'Product Managers',
    'Students',
    'Professionals',
    'Everyone',
  ]

  const handleUpload = async (file: File, type: 'image' | 'document') => {
    try {
      const result = await uploadFile({ file })
      if (type === 'image') {
        setImageUrl(result.url)
      } else {
        setDocumentUrl(result.url)
      }
      message.success(`${type} uploaded successfully`)
    } catch (error) {
      message.error(`Failed to upload ${type}`)
    }
  }

  const onFinish = async (values: any) => {
    try {
      if (!user?.id) {
        message.error('You must be logged in to create an event')
        return
      }

      await createEvent({
        data: {
          title: values.title,
          description: values.description,
          location: values.location,
          date: values.date,
          category: values.category,
          imageUrl,
          documentUrl,
          creatorId: user.id,
          status: 'PENDING',
        },
      })

      message.success('Event created successfully')
      navigate('/my-events')
    } catch (error) {
      message.error('Failed to create event')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>
            <i className="las la-calendar-plus" /> Create New Event
          </Title>
          <Text>
            Share your event with the community by filling out the details below
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ background: '#fff', padding: 24, borderRadius: 8 }}
        >
          <Form.Item
            label="Event Title"
            name="title"
            rules={[{ required: true, message: 'Please enter event title' }]}
          >
            <Input
              prefix={<i className="las la-heading" />}
              placeholder="Enter event title"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please enter event description' },
            ]}
          >
            <Input.TextArea placeholder="Enter event description" rows={4} />
          </Form.Item>

          <Form.Item
            label="Venue"
            name="location"
            rules={[{ required: true, message: 'Please enter event venue' }]}
          >
            <Input
              prefix={<i className="las la-map-marker" />}
              placeholder="Enter venue location"
            />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select event date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[
              { required: true, message: 'Please select event category' },
            ]}
          >
            <Select placeholder="Select event category">
              {eventCategories.map(category => (
                <Select.Option key={category} value={category}>
                  {category}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Target Audience" name="audience">
            <Select mode="multiple" placeholder="Select target audience">
              {targetAudiences.map(audience => (
                <Select.Option key={audience} value={audience}>
                  {audience}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Event Image">
            <Upload
              maxCount={1}
              beforeUpload={file => {
                handleUpload(file, 'image')
                return false
              }}
              listType="picture-card"
            >
              <div>
                <i className="las la-image" />
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item label="Supporting Documents">
            <Upload
              maxCount={1}
              beforeUpload={file => {
                handleUpload(file, 'document')
                return false
              }}
            >
              <Button icon={<i className="las la-file-upload" />}>
                Upload Document
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              <i className="las la-save" /> Create Event
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}
