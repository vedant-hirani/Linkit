import {
  Typography,
  Card,
  Button,
  List,
  Modal,
  message,
  Tabs,
  Empty,
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

export default function MentorshipPage() {
  const { user } = useUserContext()
  const [selectedMentorId, setSelectedMentorId] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  // Fetch available mentors
  const { data: mentors } = Api.user.findMany.useQuery({
    where: {
      globalRole: 'USER',
      NOT: {
        id: user?.id,
      },
    },
  })

  // Fetch my mentorship relationships
  const { data: mentorships, refetch: refetchMentorships } =
    Api.mentorship.findMany.useQuery({
      where: {
        OR: [{ menteeId: user?.id }, { mentorId: user?.id }],
      },
      include: {
        mentor: true,
        mentee: true,
      },
    })

  // Create mentorship request
  const { mutateAsync: createMentorship } = Api.mentorship.create.useMutation()

  const handleMentorshipRequest = async () => {
    try {
      await createMentorship({
        data: {
          mentorId: selectedMentorId,
          menteeId: user?.id || '',
          status: 'PENDING',
        },
      })
      message.success('Mentorship request sent successfully!')
      setIsModalVisible(false)
      refetchMentorships()
    } catch (error) {
      message.error('Failed to send mentorship request')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-user-friends"></i> Mentorship Platform
        </Title>
        <Text>Connect with mentors, share knowledge, and grow together.</Text>

        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: (
                <span>
                  <i className="las la-users"></i> Available Mentors
                </span>
              ),
              children: (
                <div style={{ marginTop: 20 }}>
                  {mentors && mentors.length > 0 ? (
                    <List
                      grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 4,
                        xxl: 4,
                      }}
                      dataSource={mentors}
                      renderItem={mentor => (
                        <List.Item>
                          <Card
                            hoverable
                            cover={
                              <img
                                alt={mentor.name || 'Mentor'}
                                src={mentor.pictureUrl}
                                style={{ height: 200, objectFit: 'cover' }}
                              />
                            }
                          >
                            <Card.Meta
                              title={mentor.name}
                              description={mentor.email}
                            />
                            <Button
                              type="primary"
                              style={{ marginTop: 16 }}
                              onClick={() => {
                                setSelectedMentorId(mentor.id)
                                setIsModalVisible(true)
                              }}
                            >
                              <i className="las la-handshake"></i> Request
                              Mentorship
                            </Button>
                          </Card>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty description="No mentors available" />
                  )}
                </div>
              ),
            },
            {
              key: '2',
              label: (
                <span>
                  <i className="las la-handshake"></i> My Mentorships
                </span>
              ),
              children: (
                <div style={{ marginTop: 20 }}>
                  {mentorships && mentorships.length > 0 ? (
                    <List
                      dataSource={mentorships}
                      renderItem={mentorship => (
                        <List.Item>
                          <Card style={{ width: '100%' }}>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div>
                                <Text strong>
                                  {mentorship.mentorId === user?.id
                                    ? 'Mentee: '
                                    : 'Mentor: '}
                                </Text>
                                <Text>
                                  {mentorship.mentorId === user?.id
                                    ? mentorship.mentee?.name
                                    : mentorship.mentor?.name}
                                </Text>
                              </div>
                              <div>
                                <Text strong>Status: </Text>
                                <Text>{mentorship.status}</Text>
                              </div>
                              <Text type="secondary">
                                Started:{' '}
                                {dayjs(mentorship.createdAt).format(
                                  'MMMM D, YYYY',
                                )}
                              </Text>
                            </div>
                          </Card>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <Empty description="No mentorships found" />
                  )}
                </div>
              ),
            },
          ]}
        />

        <Modal
          title="Confirm Mentorship Request"
          open={isModalVisible}
          onOk={handleMentorshipRequest}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>Are you sure you want to request mentorship from this person?</p>
        </Modal>
      </div>
    </PageLayout>
  )
}
