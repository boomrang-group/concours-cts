import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'users.json');

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const usersData = await fs.readFile(usersFilePath, 'utf-8');
    const users = JSON.parse(usersData);

    const existingUser = users.find((user: any) => user.email === email);
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: Date.now().toString(), name, email, password: hashedPassword };
    users.push(newUser);

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    return new Response(
      JSON.stringify({ message: 'User created successfully', userId: newUser.id }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
