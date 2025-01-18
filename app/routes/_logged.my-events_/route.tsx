import { Typography, Tabs, Card, Rate, Empty, Spin, Tag } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function MyEventsPage() {
  const { user } = useUserContext()
  const navigate = useNavigate()

  // Fetch events where user is creator
  const { data: createdEvents, isLoading: isLoadingCreated } =
    Api.event.findMany.useQuery({
      where: { creatorId: user?.id },
      orderBy: { createdAt: 'desc' },
    })

  // Fetch event registrations for the user
  const { data: registrations, isLoading: isLoadingRegistrations } =
    Api.eventRegistration.findMany.useQuery({
      where: { userId: user?.id },
      include: { event: true },
      orderBy: { createdAt: 'desc' },
    })

  const renderEventCard = (event: any) => (
    <Card
      key={event.id}
      hoverable
      style={{ marginBottom: 16 }}
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt={event.title}
            style={{
              width: 120,
              height: 120,
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
        )}
        <div style={{ flex: 1 }}>
          <Title level={4} style={{ margin: 0 }}>
            {event.title}
          </Title>
          <Text type="secondary">
            <i className="las la-calendar"></i>{' '}
            {dayjs(event.date).format('MMM D, YYYY')}
          </Text>
          <br />
          <Text>
            <i className="las la-map-marker"></i>{' '}
            {event.location || 'No location specified'}
          </Text>
          <div style={{ marginTop: 8 }}>
            <Tag color={event.status === 'UPCOMING' ? 'blue' : 'green'}>
              {event.status || 'UPCOMING'}
            </Tag>
          </div>
        </div>
      </div>
    </Card>
  )

  const renderRegistrationCard = (registration: any) => (
    <Card
      key={registration.id}
      hoverable
      style={{ marginBottom: 16 }}
      onClick={() => navigate(`/events/${registration.event.id}`)}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        {registration.event.imageUrl && (
          <img
            src={registration.event.imageUrl}
            alt={registration.event.title}
            style={{
              width: 120,
              height: 120,
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
        )}
        <div style={{ flex: 1 }}>
          <Title level={4} style={{ margin: 0 }}>
            {registration.event.title}
          </Title>
          <Text type="secondary">
            <i className="las la-calendar"></i>{' '}
            {dayjs(registration.event.date).format('MMM D, YYYY')}
          </Text>
          <br />
          <Text>Status: {registration.status || 'Registered'}</Text>
          {registration.rating && (
            <div style={{ marginTop: 8 }}>
              <Rate disabled defaultValue={registration.rating} />
            </div>
          )}
          {registration.feedback && (
            <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
              Feedback: {registration.feedback}
            </Text>
          )}
        </div>
      </div>
    </Card>
  )

  const items = [
    {
      key: '1',
      label: (
        <span>
          <i className="las la-ticket-alt"></i> Registered Events
        </span>
      ),
      children: (
        <div style={{ padding: '16px 0' }}>
          {isLoadingRegistrations ? (
            <div style={{ textAlign: 'center', padding: 24 }}>
              <Spin size="large" />
            </div>
          ) : registrations?.length ? (
            registrations.map(registration =>
              renderRegistrationCard(registration),
            )
          ) : (
            <Empty description="You haven't registered for any events yet" />
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <i className="las la-calendar-plus"></i> Created Events
        </span>
      ),
      children: (
        <div style={{ padding: '16px 0' }}>
          {isLoadingCreated ? (
            <div style={{ textAlign: 'center', padding: 24 }}>
              <Spin size="large" />
            </div>
          ) : createdEvents?.length ? (
            createdEvents.map(event => renderEventCard(event))
          ) : (
            <Empty description="You haven't created any events yet" />
          )}
        </div>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
        <Title level={2}>
          <i className="las la-calendar-check"></i> My Events
        </Title>
        <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
          Manage your event registrations and created events
        </Text>

        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </PageLayout>
  )
}
