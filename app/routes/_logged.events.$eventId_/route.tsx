import {
  Typography,
  Card,
  Button,
  Rate,
  Input,
  Space,
  Row,
  Col,
  notification,
  Modal,
} from 'antd'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function EventDetailsPage() {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const { user, isLoggedIn } = useUserContext()
  const [feedbackVisible, setFeedbackVisible] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)

  // Fetch event details with creator information
  const { data: event, refetch } = Api.event.findFirst.useQuery({
    where: { id: eventId },
    include: { creator: true },
  })

  // Fetch user's registration for this event
  const { data: registration } = Api.eventRegistration.findFirst.useQuery({
    where: { eventId, userId: user?.id },
  })

  // Mutations
  const { mutateAsync: registerForEvent } =
    Api.eventRegistration.create.useMutation()
  const { mutateAsync: updateRegistration } =
    Api.eventRegistration.update.useMutation()
  const { mutateAsync: createNotification } =
    Api.notification.create.useMutation()

  const handleRegister = async () => {
    if (!isLoggedIn) {
      notification.warning({ message: 'Please login to register for events' })
      return
    }

    try {
      await registerForEvent({
        data: {
          eventId: eventId!,
          userId: user!.id,
          status: 'REGISTERED',
        },
      })

      // Notify event creator
      await createNotification({
        data: {
          userId: event!.creatorId,
          type: 'EVENT_REGISTRATION',
          content: `${user!.name} has registered for your event: ${
            event!.title
          }`,
          isRead: false,
        },
      })

      notification.success({ message: 'Successfully registered for event' })
      refetch()
    } catch (error) {
      notification.error({ message: 'Failed to register for event' })
    }
  }

  const handleSubmitFeedback = async () => {
    try {
      await updateRegistration({
        where: { id: registration!.id },
        data: { feedback, rating },
      })
      setFeedbackVisible(false)
      notification.success({ message: 'Feedback submitted successfully' })
      refetch()
    } catch (error) {
      notification.error({ message: 'Failed to submit feedback' })
    }
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: event?.title,
        text: event?.description,
        url: window.location.href,
      })
    } catch (error) {
      notification.info({
        message: 'Copy link to share: ' + window.location.href,
      })
    }
  }

  if (!event) return null

  return (
    <PageLayout layout="full-width">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={14}>
          <Card>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                  }}
                />
              )}

              <Title level={2}>{event.title}</Title>

              <Space>
                <i className="las la-calendar"></i>
                <Text>{dayjs(event.date).format('MMMM D, YYYY')}</Text>
                {event.location && (
                  <>
                    <i className="las la-map-marker"></i>
                    <Text>{event.location}</Text>
                  </>
                )}
              </Space>

              <Paragraph>{event.description}</Paragraph>

              <Space>
                <Button
                  type="primary"
                  onClick={handleRegister}
                  disabled={!!registration}
                >
                  {registration ? 'Registered' : 'Register Now'}
                </Button>

                <Button onClick={handleShare}>
                  <i className="las la-share"></i> Share
                </Button>

                {registration && (
                  <Button onClick={() => setFeedbackVisible(true)}>
                    <i className="las la-comment"></i> Give Feedback
                  </Button>
                )}
              </Space>

              {event.creator && (
                <Card size="small" title="Organizer">
                  <Space>
                    <img
                      src={event.creator.pictureUrl || ''}
                      alt={event.creator.name || ''}
                      style={{ width: 40, height: 40, borderRadius: '50%' }}
                    />
                    <Text>{event.creator.name}</Text>
                  </Space>
                </Card>
              )}
            </Space>
          </Card>

          <Modal
            title="Event Feedback"
            open={feedbackVisible}
            onOk={handleSubmitFeedback}
            onCancel={() => setFeedbackVisible(false)}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Rate this event:</Text>
              <Rate value={rating} onChange={setRating} />
              <Text>Your feedback:</Text>
              <TextArea
                rows={4}
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Share your experience..."
              />
            </Space>
          </Modal>
        </Col>
      </Row>
    </PageLayout>
  )
}
