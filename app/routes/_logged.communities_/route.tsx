import {
  Typography,
  Input,
  Button,
  Card,
  Row,
  Col,
  Modal,
  Form,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { Search } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function CommunitiesPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [form] = Form.useForm()
  const { mutateAsync: upload } = useUploadPublic()

  // Fetch communities with members and creators included
  const { data: communities, refetch } = Api.community.findMany.useQuery({
    include: {
      creator: true,
      communityMembers: {
        include: {
          user: true,
        },
      },
    },
  })

  // Create community mutation
  const { mutateAsync: createCommunity } = Api.community.create.useMutation()

  // Join community mutation
  const { mutateAsync: joinCommunity } =
    Api.communityMember.create.useMutation()

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase())
  }

  const filteredCommunities = communities?.filter(
    community =>
      community.name.toLowerCase().includes(searchTerm) ||
      community.location?.toLowerCase().includes(searchTerm) ||
      community.category?.toLowerCase().includes(searchTerm),
  )

  const handleCreateCommunity = async (values: any) => {
    try {
      let imageUrl = ''
      if (values.imageFile?.[0]) {
        const uploadResult = await upload({
          file: values.imageFile[0].originFileObj,
        })
        imageUrl = uploadResult.url
      }

      await createCommunity({
        data: {
          name: values.name,
          description: values.description,
          category: values.category,
          location: values.location,
          imageUrl,
          creatorId: user?.id || '',
        },
      })

      message.success('Community created successfully!')
      setIsCreateModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to create community')
    }
  }

  const handleJoinCommunity = async (communityId: string) => {
    try {
      await joinCommunity({
        data: {
          communityId,
          userId: user?.id || '',
          role: 'MEMBER',
        },
      })
      message.success('Joined community successfully!')
      refetch()
    } catch (error) {
      message.error('Failed to join community')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Title level={2}>
              <i className="las la-users" style={{ marginRight: 8 }}></i>
              Communities
            </Title>
            <Text>Join communities to connect with like-minded people</Text>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => setIsCreateModalVisible(true)}
            >
              <i className="las la-plus" style={{ marginRight: 8 }}></i>
              Create Community
            </Button>
          </Col>
        </Row>

        <Search
          placeholder="Search by name, location, or category..."
          size="large"
          style={{ marginBottom: 24 }}
          onSearch={handleSearch}
          onChange={e => handleSearch(e.target.value)}
        />

        <Row gutter={[16, 16]}>
          {filteredCommunities?.map(community => (
            <Col xs={24} sm={12} lg={8} key={community.id}>
              <Card
                hoverable
                cover={
                  community.imageUrl && (
                    <img
                      alt={community.name}
                      src={community.imageUrl}
                      style={{ height: 200, objectFit: 'cover' }}
                    />
                  )
                }
              >
                <Card.Meta
                  title={community.name}
                  description={
                    <>
                      <p>{community.description}</p>
                      {community.location && (
                        <Text type="secondary">
                          <i
                            className="las la-map-marker"
                            style={{ marginRight: 4 }}
                          ></i>
                          {community.location}
                        </Text>
                      )}
                      <br />
                      {community.category && (
                        <Text type="secondary">
                          <i
                            className="las la-tag"
                            style={{ marginRight: 4 }}
                          ></i>
                          {community.category}
                        </Text>
                      )}
                    </>
                  }
                />
                <div style={{ marginTop: 16 }}>
                  <Button
                    type="primary"
                    block
                    onClick={() => navigate(`/communities/${community.id}`)}
                  >
                    View Details
                  </Button>
                  {user &&
                    !community.communityMembers.some(
                      member => member.userId === user.id,
                    ) && (
                      <Button
                        style={{ marginTop: 8 }}
                        block
                        onClick={() => handleJoinCommunity(community.id)}
                      >
                        Join Community
                      </Button>
                    )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          title="Create New Community"
          open={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateCommunity}>
            <Form.Item
              name="name"
              label="Community Name"
              rules={[
                { required: true, message: 'Please enter community name' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Input />
            </Form.Item>
            <Form.Item name="location" label="Location">
              <Input />
            </Form.Item>
            <Form.Item name="imageFile" label="Community Image">
              <Input type="file" accept="image/*" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Create Community
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
