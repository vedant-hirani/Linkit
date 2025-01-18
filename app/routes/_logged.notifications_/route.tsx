import {
  Typography,
  Card,
  List,
  Switch,
  Tag,
  Radio,
  Empty,
  Spin,
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

export default function NotificationsPage() {
  const { user } = useUserContext()
  const [filterType, setFilterType] = useState<string>('all')

  // Fetch notifications
  const {
    data: notifications,
    isLoading,
    refetch,
  } = Api.notification.findMany.useQuery({
    where: {
      userId: user?.id,
      ...(filterType !== 'all' && { type: filterType }),
    },
    orderBy: { createdAt: 'desc' },
  })

  // Update notification read status
  const { mutateAsync: updateNotification } =
    Api.notification.update.useMutation()

  const handleToggleRead = async (id: string, currentStatus: boolean) => {
    try {
      await updateNotification({
        where: { id },
        data: { isRead: !currentStatus },
      })
      await refetch()
      message.success('Notification status updated')
    } catch (error) {
      message.error('Failed to update notification status')
    }
  }

  const notificationTypes = [
    'all',
    'event',
    'community',
    'mentorship',
    'system',
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'event':
        return 'las la-calendar'
      case 'community':
        return 'las la-users'
      case 'mentorship':
        return 'las la-user-graduate'
      case 'system':
        return 'las la-cog'
      default:
        return 'las la-bell'
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>
            <i className="las la-bell" style={{ marginRight: 8 }}></i>
            Notifications
          </Title>
          <Text type="secondary">
            Manage your notifications and preferences
          </Text>
        </div>

        <Card style={{ marginBottom: 24 }}>
          <Title level={4}>Filter Notifications</Title>
          <Radio.Group
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            style={{ marginBottom: 16 }}
          >
            {notificationTypes.map(type => (
              <Radio.Button key={type} value={type}>
                <i
                  className={getNotificationIcon(type)}
                  style={{ marginRight: 4 }}
                ></i>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Card>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        ) : notifications && notifications.length > 0 ? (
          <List
            dataSource={notifications}
            renderItem={notification => (
              <List.Item>
                <Card style={{ width: '100%' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 8,
                        }}
                      >
                        <i
                          className={getNotificationIcon(notification.type)}
                          style={{ fontSize: 20 }}
                        ></i>
                        <Tag color={notification.isRead ? 'default' : 'blue'}>
                          {notification.type.toUpperCase()}
                        </Tag>
                        <Text type="secondary">
                          {dayjs(notification.createdAt).format(
                            'MMM D, YYYY HH:mm',
                          )}
                        </Text>
                      </div>
                      <Text>{notification.content}</Text>
                    </div>
                    <Switch
                      checkedChildren="Read"
                      unCheckedChildren="Unread"
                      checked={notification.isRead}
                      onChange={() =>
                        handleToggleRead(notification.id, notification.isRead)
                      }
                    />
                  </div>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Empty
            description="No notifications found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
    </PageLayout>
  )
}
