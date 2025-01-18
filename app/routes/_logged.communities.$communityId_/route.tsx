import {
  Typography,
  Card,
  Button,
  Input,
  List,
  Avatar,
  Space,
  message,
  Tabs,
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

export default function CommunityDetailsPage() {
  const { communityId } = useParams()
  const navigate = useNavigate()
  const [newDiscussion, setNewDiscussion] = useState('')
  const { data: userContext } = Api.user.findFirst.useQuery({})

  const { data: community, refetch } = Api.community.findFirst.useQuery({
    where: { id: communityId },
    include: {
      creator: true,
      communityMembers: {
        include: { user: true },
      },
      discussions: {
        include: { user: true },
      },
    },
  })

  const { mutateAsync: createDiscussion } = Api.discussion.create.useMutation()
  const { mutateAsync: joinCommunity } =
    Api.communityMember.create.useMutation()
  const { mutateAsync: leaveCommunity } =
    Api.communityMember.delete.useMutation()

  const isMember = community?.communityMembers?.some(
    member => member.userId === userContext?.id,
  )

  const handleJoinCommunity = async () => {
    if (!communityId || !userContext?.id) {
      message.error('Unable to join community at this time')
      return
    }

    try {
      await joinCommunity({
        data: {
          role: 'MEMBER',
          communityId: communityId,
          userId: userContext.id,
        },
      })
      message.success('Successfully joined the community!')
      refetch()
    } catch (error) {
      message.error('Failed to join community')
    }
  }

  const handleLeaveCommunity = async () => {
    if (!userContext?.id) {
      message.error('Unable to leave community at this time')
      return
    }

    try {
      const membershipToDelete = community?.communityMembers?.find(
        member => member.userId === userContext.id,
      )
      if (membershipToDelete) {
        await leaveCommunity({ where: { id: membershipToDelete.id } })
        message.success('Successfully left the community')
        refetch()
      }
    } catch (error) {
      message.error('Failed to leave community')
    }
  }

  const handlePostDiscussion = async () => {
    if (!communityId || !userContext?.id) {
      message.error('Unable to post discussion at this time')
      return
    }

    if (!newDiscussion.trim()) {
      message.warning('Please enter a message')
      return
    }

    try {
      await createDiscussion({
        data: {
          content: newDiscussion,
          communityId: communityId,
          userId: userContext.id,
        },
      })
      setNewDiscussion('')
      message.success('Discussion posted successfully!')
      refetch()
    } catch (error) {
      message.error('Failed to post discussion')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Card>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            {community?.imageUrl && (
              <img
                src={community.imageUrl}
                alt={community.name}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            )}
            <Title level={2}>{community?.name}</Title>
            <Paragraph>{community?.description}</Paragraph>
            <Space>
              <Text>
                <i className="las la-map-marker"></i> {community?.location}
              </Text>
              <Text>
                <i className="las la-tag"></i> {community?.category}
              </Text>
            </Space>

            {userContext && (
              <div style={{ marginTop: 16 }}>
                {!isMember ? (
                  <Button type="primary" onClick={handleJoinCommunity}>
                    <i className="las la-user-plus"></i> Join Community
                  </Button>
                ) : (
                  <Button danger onClick={handleLeaveCommunity}>
                    <i className="las la-user-minus"></i> Leave Community
                  </Button>
                )}
              </div>
            )}
          </div>

          <Tabs
            items={[
              {
                key: '1',
                label: (
                  <span>
                    <i className="las la-comments"></i> Discussions
                  </span>
                ),
                children: (
                  <div>
                    {isMember && (
                      <div style={{ marginBottom: 24 }}>
                        <TextArea
                          value={newDiscussion}
                          onChange={e => setNewDiscussion(e.target.value)}
                          placeholder="Share your thoughts..."
                          rows={4}
                        />
                        <Button
                          type="primary"
                          onClick={handlePostDiscussion}
                          style={{ marginTop: 16 }}
                        >
                          <i className="las la-paper-plane"></i> Post
                        </Button>
                      </div>
                    )}

                    <List
                      itemLayout="horizontal"
                      dataSource={community?.discussions}
                      renderItem={discussion => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar src={discussion.user?.pictureUrl} />
                            }
                            title={
                              <Space>
                                <Text strong>{discussion.user?.name}</Text>
                                <Text type="secondary">
                                  {dayjs(discussion.createdAt).format(
                                    'MMM D, YYYY',
                                  )}
                                </Text>
                              </Space>
                            }
                            description={discussion.content}
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                ),
              },
              {
                key: '2',
                label: (
                  <span>
                    <i className="las la-users"></i> Members (
                    {community?.communityMembers?.length})
                  </span>
                ),
                children: (
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
                    dataSource={community?.communityMembers}
                    renderItem={member => (
                      <List.Item>
                        <Card
                          hoverable
                          onClick={() => navigate(`/users/${member.user?.id}`)}
                        >
                          <Card.Meta
                            avatar={
                              <Avatar src={member.user?.pictureUrl} size={64} />
                            }
                            title={member.user?.name}
                            description={
                              <Text type="secondary">
                                <i className="las la-user-tag"></i>{' '}
                                {member.role}
                              </Text>
                            }
                          />
                        </Card>
                      </List.Item>
                    )}
                  />
                ),
              },
            ]}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
