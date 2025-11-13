import { http, HttpResponse } from 'msw';
import Mock from 'mockjs';

export const handlers = [
  // GET /api/demo（示例接口）
  http.get('/api/demo', () => {
    return HttpResponse.json({ message: 'Hello from MSW mock' });
  }),

  // GET /api/users?page=1&pageSize=10（分页示例）
  http.get('/api/users', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
    const total = 137;
    const list = Mock.mock({
      [`items|${pageSize}`]: [
        {
          id: '@id',
          name: '@cname',
          avatar: "@image('64x64', '#6366f1', '#fff', 'A')",
          email: '@email',
          score: '@integer(60, 100)',
          createdAt: '@datetime',
        },
      ],
    }).items;
    return HttpResponse.json({ page, pageSize, total, list });
  }),

  // POST /api/login（登录示例）
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as { username: string; password: string };
    if (body.username && body.password) {
      return HttpResponse.json({ token: Mock.Random.guid(), user: { name: body.username } });
    }
    return HttpResponse.json({ message: 'Bad credentials' }, { status: 400 });
  }),
];
