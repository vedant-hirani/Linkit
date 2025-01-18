import { Typography, Card, Row, Col, Table, Tag, Button, Statistic } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AdminDashboardPage() {
  const navigate = useNavigate()

  // Fetch events that need review
  const { data: pendingEvents } = Api.event.findMany.useQuery({
    where: { status: 'PENDING' },
    include: { creator: true },
  })

  // Fetch communities
  const { data: communities } = Api.community.findMany.useQuery({
    include: { creator: true, communityMembers: true },
  })

  // Fetch support tickets
  const { data: supportTickets } = Api.supportTicket.findMany.useQuery({
    where: { status: 'OPEN' },
  })

  // Fetch user analytics
  const { data: userMetrics } = Api.analyticsLocalMetric.findFirst.useQuery({
    where: { key: 'USER_ENGAGEMENT' },
  })

  // Event approval mutation
  const { mutateAsync: updateEvent } = Api.event.update.useMutation()

  const handleEventApproval = async (eventId: string, status: string) => {
    await updateEvent({
      where: { id: eventId },
      data: { status },
    })
  }

  const eventColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
      render: (creator: any) => creator?.name || 'Unknown',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <span>
          <Button
            type="primary"
            size="small"
            onClick={() => handleEventApproval(record.id, 'APPROVED')}
            style={{ marginRight: 8 }}
          >
            <i className="las la-check"></i> Approve
          </Button>
          <Button
            danger
            size="small"
            onClick={() => handleEventApproval(record.id, 'REJECTED')}
          >
            <i className="las la-times"></i> Reject
          </Button>
        </span>
      ),
    },
  ]

  const communityColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Members',
      key: 'members',
      render: (record: any) =>
        record.communityMembers?.length.toString() || '0',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
      render: (creator: any) => creator?.name || 'Unknown',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Button onClick={() => navigate(`/communities/${record.id}`)}>
          <i className="las la-eye"></i> View
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-tachometer-alt"></i> Admin Dashboard
        </Title>
        <Text type="secondary">
          Manage platform activities, users, and generate reports
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Users"
                value={userMetrics?.countPositive || 0}
                prefix={<i className="las la-users"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Pending Events"
                value={pendingEvents?.length || 0}
                prefix={<i className="las la-calendar-check"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Communities"
                value={communities?.length || 0}
                prefix={<i className="las la-users-cog"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Open Tickets"
                value={supportTickets?.length || 0}
                prefix={<i className="las la-ticket-alt"></i>}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-calendar"></i> Pending Events
                </>
              }
            >
              <Table
                dataSource={pendingEvents}
                columns={eventColumns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-users"></i> Communities
                </>
              }
            >
              <Table
                dataSource={communities}
                columns={communityColumns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
