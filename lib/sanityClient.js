import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'tjr9dyd3',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: false,
  token:
    'skSSFZJIcdRGlRvUdj2qjyAKC3xumUuRrMQuCTDZCDvhF0JjGqXTcCNJGVVMCH5qp6QxnzIHvYSRA3A0z1v4EA5ET5xNoP0igSuY1i9m3uNiRqebUCAIE2xjjugb2ffDzBc79YRzhl0dXJK5RWI47V9OEZ5IQwdOVmrwIC4q8yobT9pmrv8c',
})
