import {
  Typography,
  Card,
  Button,
  Row,
  Col,
  Statistic,
  Avatar,
  Divider,
  List,
  Tag,
} from 'antd'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function UserProfilePage() {
  const { userId } = useParams()
  const navigate = useNavigate()

  // Fetch user data with related information
  const { data: user, isLoading } = Api.user.findFirst.useQuery({
    where: { id: userId },
    include: {
      eventRegistrations: {
        include: { event: true },
      },
      communityMembers: {
        include: { community: true },
      },
      mentorshipsAsMentor: true,
      mentorshipsAsMentee: true,
      achievements: true,
    },
  })

  // Mutation for creating mentorship request
  const { mutateAsync: createMentorship } = Api.mentorship.create.useMutation()

  const handleMentorshipRequest = async () => {
    if (!userId) return
    try {
      await createMentorship({
        data: {
          status: 'PENDING',
          mentorId: userId,
          menteeId: user?.id || '',
        },
      })
      navigate('/mentorship')
    } catch (error) {
      console.error('Error creating mentorship request:', error)
    }
  }

  if (isLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  if (!user) {
    return <PageLayout layout="full-width">User not found</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Card>
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} sm={8}>
              <div style={{ textAlign: 'center' }}>
                <Avatar size={120} src={user.pictureUrl} />
                <Title level={2} style={{ marginTop: 16, marginBottom: 0 }}>
                  {user.name}
                </Title>
                <Text type="secondary">{user.email}</Text>
                <div style={{ marginTop: 16 }}>
                  <Button type="primary" onClick={handleMentorshipRequest}>
                    <i className="las la-user-friends" /> Request Mentorship
                  </Button>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={16}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Statistic
                    title="Events Attended"
                    value={user.eventRegistrations.length}
                    prefix={<i className="las la-calendar-check" />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Communities"
                    value={user.communityMembers.length}
                    prefix={<i className="las la-users" />}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Achievements"
                    value={user.achievements.length}
                    prefix={<i className="las la-trophy" />}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        <Divider orientation="left">
          <i className="las la-calendar" /> Event History
        </Divider>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
          dataSource={user.eventRegistrations}
          renderItem={registration => (
            <List.Item>
              <Card
                hoverable
                onClick={() => navigate(`/events/${registration.event?.id}`)}
              >
                <Title level={4}>{registration.event?.title}</Title>
                <Text type="secondary">
                  {dayjs(registration.event?.date).format('MMM D, YYYY')}
                </Text>
                <div style={{ marginTop: 8 }}>
                  <Tag color="blue">{registration.status}</Tag>
                </div>
              </Card>
            </List.Item>
          )}
        />

        <Divider orientation="left">
          <i className="las la-users" /> Community Involvement
        </Divider>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3 }}
          dataSource={user.communityMembers}
          renderItem={member => (
            <List.Item>
              <Card
                hoverable
                onClick={() => navigate(`/communities/${member.community?.id}`)}
              >
                <Title level={4}>{member.community?.name}</Title>
                <Tag color="green">{member.role}</Tag>
                <Paragraph ellipsis={{ rows: 2 }}>
                  {member.community?.description}
                </Paragraph>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </PageLayout>
  )
}
