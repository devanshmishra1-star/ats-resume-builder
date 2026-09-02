import { POST } from './app/api/admin/blogs/route';
import { NextRequest } from 'next/server';

async function run() {
  const req = new NextRequest('http://localhost:3000/api/admin/blogs/', {
    method: 'POST',
    body: JSON.stringify({
      title: 'My Test Blog',
      slug: 'my-test-blog',
      content: '<p>Hello world</p>',
      category: 'Tech',
      status: 'DRAFT'
    })
  });
  
  const res = await POST(req);
  console.log('Status:', res.status);
  console.log('Body:', await res.text());
}
run();
