# AuthJs Template

A template repo for starting authentication in your upcoming Next.js application. Used Drizzle, Auth.js(Next-Auth), Turso.

## What's inside?

- How to setup Credentials login with username/password in NextJs.
- How to setup Two factor in NextJs.
- How to setup Passkey in NextJs.
- How to setup Oauth Login in NextJs.
- How to Link accounts in NextJs.

All these with Next-auth(AuthJs v5).

---

## Basic

- [x] Register | Public
- [x] Login | Public
- [x] Credentials Login | Public
- [x] Social Login(Google, Github) | Public
- [x] Email Verification | Public

## Password Reset

- [x] Password Reset (email link) | Public
- [x] change password(Email user can change password) | Protected
- [x] Add Password(Oauth user can set Password.) | Protected

## Profile Update

- [ ] Profile Update | Protected
- [ ] Profile Picture Update | Protected
- [ ] Email Update | Protected
- [ ] Username Update | Protected
- [x] Delete Account | Protected

## Link Accounts

- [x] Account linking | Protected
- [x] Account Unlinking | Protected

## Two Factor Authentication

- [x] Two Factor - Register with QRCode | Protected
- [x] Two Factor - Verify after register | Protected
- [x] Two Factor - Used After login(Oauth as well as Credentials) | Public
- [x] Add Backup options(Verify using email)
- [x] Disable Two Factor.


## Passkey/ Passwordless Login

- [x] Passkey/ Passwordless Login

## Role Based Access

- [x] Role Based Access | Protected

> Here I used my domain to select admin user. After that admin can another admin

## User Management (Admin)

- [x] Admin Dashboard
- [ ] Permission

## Database sessions

- [x] Database sessions checkout [db-session](https://github.com/patelvivekdev/drizzle-next-auth-turso/tree/db-session)

## Emails

- [ ] Send email for every account change event and store the history.

## Links

- [Live Link JWT Sessions](https://drizzle-next-auth-turso.vercel.app)
- [Live Link DB Sessions](https://drizzle-next-auth-turso-db-sessions.vercel.app)
- [AuthJS](https://authjs.dev)
- [Drizzle](https://drizzle.team)
- [Turso](https://turso.dev)
- [NextJs](https://nextjs.org)
- [patelvivek.dev](https://patelvivek.dev)

## Open In IDX

<a href="https://idx.google.com/import?url=https://github.com/patelvivekdev/drizzle-next-auth-turso">
  <img height="32" alt="Open in IDX" src="https://cdn.idx.dev/btn/open_dark_32@2x.png">
</a>

<div align="center">
  <div align="center">
    <img src="https://img.shields.io/github/stars/patelvivekdev/drizzle-next-auth-turso?style=for-the-badge" alt="Stars" />
    <img src="https://img.shields.io/github/forks/patelvivekdev/drizzle-next-auth-turso?style=for-the-badge" alt="Forks" />
    <img src="https://img.shields.io/github/issues/patelvivekdev/drizzle-next-auth-turso?style=for-the-badge" alt="Issues" />
  </div>
    Made with ❤️ by Vivek Patel
</div>
