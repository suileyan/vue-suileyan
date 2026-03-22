import { http, HttpResponse } from 'msw';

const names: [string, ...string[]] = [
  'Alex',
  'Bailey',
  'Casey',
  'Drew',
  'Emery',
  'Finley',
  'Harper',
  'Jamie',
  'Jordan',
  'Kai',
];
const domains: [string, ...string[]] = ['example.com', 'mail.test', 'demo.local'];

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (list: [string, ...string[]]) => list[randomInt(0, list.length - 1)] ?? list[0];
const randomName = () => pick(names);
const randomEmail = (name: string) => `${name.toLowerCase()}${randomInt(10, 999)}@${pick(domains)}`;
const randomId = () =>
  globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const randomAvatar = (name: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`;
const randomDate = () =>
  new Date(Date.now() - randomInt(0, 365) * 24 * 60 * 60 * 1000).toISOString();

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
    const list = Array.from({ length: pageSize }, () => {
      const name = randomName();
      return {
        id: randomId(),
        name,
        avatar: randomAvatar(name),
        email: randomEmail(name),
        score: randomInt(60, 100),
        createdAt: randomDate(),
      };
    });
    return HttpResponse.json({ page, pageSize, total, list });
  }),

  // POST /api/login（登录示例）
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as { username: string; password: string };
    if (body.username && body.password) {
      return HttpResponse.json({ token: randomId(), user: { name: body.username } });
    }
    return HttpResponse.json({ message: 'Bad credentials' }, { status: 400 });
  }),
];
