# Admin Dashboard Feature

## Authentication
- [x] Create `middleware.js` to protect `/admin` routes
- [x] Create `app/api/admin/login/route.js` for password validation & cookie setting
- [x] Create `app/admin/login/page.jsx` (Login UI)

## Admin Layout & Dashboard
- [x] Create `app/admin/layout.jsx` (Admin Sidebar/Navigation)
- [x] Create `app/admin/page.jsx` (Dashboard Overview)

## Product Management
- [x] Create `app/admin/products/page.jsx` (List all products)
- [x] Create `app/admin/products/new/page.jsx` (Add Product Form UI)
- [x] Create `app/api/admin/products/route.js` (POST route to save product)

## Image Uploads
- [x] Setup API route for image uploads to `public/images/`

## Verification
- [ ] Verify middleware blocks unauthenticated access
- [ ] Verify login sets cookie and redirects
- [ ] Verify adding a product saves to MongoDB locally
- [ ] Verify new product images are saved locally
