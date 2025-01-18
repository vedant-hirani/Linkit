import {
  Typography,
  Input,
  Select,
  DatePicker,
  Card,
  Row,
  Col,
  Tabs,
  List,
  Tag,
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

export default function HomePage() {
  const navigate = useNavigate()
  const [view, setView] = useState<'map' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const [selectedDate, setSelectedDate] = useState<string>()

  // Fetch events with filters
  const { data: events } = Api.event.findMany.useQuery({
    where: {
      AND: [
        searchQuery
          ? {
              OR: [
                { title: { contains: searchQuery, mode: 'insensitive' } },
                { description: { contains: searchQuery, mode: 'insensitive' } },
              ],
            }
          : {},
        selectedCategory ? { category: selectedCategory } : {},
        selectedDate ? { date: selectedDate } : {},
      ],
    },
    include: {
      creator: true,
      eventRegistrations: true,
    },
  })

  // Fetch trending communities
  const { data: communities } = Api.community.findMany.useQuery({
    take: 5,
    include: {
      communityMembers: true,
    },
    orderBy: {
      communityMembers: {
        _count: 'desc',
      },
    },
  })

  const categories = [
    'Technology',
    'Business',
    'Arts',
    'Sports',
    'Education',
    'Social',
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-compass" /> Discover Events
        </Title>
        <Text type="secondary">
          Browse upcoming events, filter by your interests, and join amazing
          communities
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} md={16}>
            {/* Search and Filters */}
            <Card>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Search
                    placeholder="Search events..."
                    onChange={e => setSearchQuery(e.target.value)}
                    prefix={<i className="las la-search" />}
                  />
                </Col>
                <Col xs={24} md={8}>
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Select category"
                    onChange={setSelectedCategory}
                    allowClear
                  >
                    {categories.map(cat => (
                      <Select.Option key={cat} value={cat}>
                        {cat}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
                <Col xs={24} md={8}>
                  <DatePicker
                    style={{ width: '100%' }}
                    onChange={date =>
                      setSelectedDate(date?.format('YYYY-MM-DD'))
                    }
                  />
                </Col>
              </Row>
            </Card>

            {/* View Toggle */}
            <Tabs
              style={{ marginTop: 16 }}
              activeKey={view}
              onChange={key => setView(key as 'map' | 'list')}
              items={[
                {
                  key: 'list',
                  label: (
                    <>
                      <i className="las la-list" /> List View
                    </>
                  ),
                  children: (
                    <List
                      dataSource={events}
                      renderItem={event => (
                        <Card
                          hoverable
                          style={{ marginBottom: 16 }}
                          onClick={() => navigate(`/events/${event.id}`)}
                        >
                          <Row gutter={16}>
                            <Col xs={24} md={8}>
                              {event.imageUrl && (
                                <img
                                  src={event.imageUrl}
                                  alt={event.title}
                                  style={{
                                    width: '100%',
                                    height: 150,
                                    objectFit: 'cover',
                                  }}
                                />
                              )}
                            </Col>
                            <Col xs={24} md={16}>
                              <Title level={4}>{event.title}</Title>
                              <Text type="secondary">
                                <i className="las la-calendar" />{' '}
                                {dayjs(event.date).format('MMM D, YYYY')}
                              </Text>
                              <br />
                              <Text type="secondary">
                                <i className="las la-map-marker" />{' '}
                                {event.location}
                              </Text>
                              {event.category && (
                                <Tag color="blue" style={{ marginTop: 8 }}>
                                  {event.category}
                                </Tag>
                              )}
                            </Col>
                          </Row>
                        </Card>
                      )}
                    />
                  ),
                },
                {
                  key: 'map',
                  label: (
                    <>
                      <i className="las la-map" /> Map View
                    </>
                  ),
                  children: (
                    <div
                      style={{
                        height: 400,
                        background: '#f0f2f5',
                        padding: 16,
                      }}
                    >
                      Map View Coming Soon
                    </div>
                  ),
                },
              ]}
            />
          </Col>

          <Col xs={24} md={8}>
            {/* Trending Communities */}
            <Card
              title={
                <>
                  <i className="las la-fire" /> Trending Communities
                </>
              }
            >
              <List
                dataSource={communities}
                renderItem={community => (
                  <List.Item
                    onClick={() => navigate(`/communities/${community.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <List.Item.Meta
                      avatar={
                        <img
                          src={
                            community.imageUrl || 'https://placehold.co/50x50'
                          }
                          alt={community.name}
                          style={{ width: 50, height: 50, borderRadius: '50%' }}
                        />
                      }
                      title={community.name}
                      description={`${
                        community.communityMembers?.length || 0
                      } members`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
