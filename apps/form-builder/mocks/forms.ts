import { Form } from '@repo/form-ui/types';

export const recentForms: Form[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    title: 'Customer Feedback Survey',
    description: 'Collect customer satisfaction and feedback data',
    sections: [
      {
        id: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
        title: 'Basic Information',
        description: 'Customer details',
        fields: [
          {
            id: 'b2c3d4e5-f6a7-4890-b123-456789abcdef',
            sectionId: 'a1b2c3d4-e5f6-4789-a012-3456789abcde',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your name',
            required: true,
            order: 1,
          },
        ],
        order: 1,
        showInfo: true,
      },
    ],
    createdAt: 1705315800000,
    updatedAt: 1705752300000,
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    title: 'Job Application Form',
    description: 'Application form for open positions',
    sections: [
      {
        id: 'c3d4e5f6-a7b8-4901-c234-56789abcdef0',
        title: 'Personal Details',
        description: 'Basic personal information',
        fields: [
          {
            id: 'd4e5f6a7-b8c9-4012-d345-6789abcdef01',
            sectionId: 'c3d4e5f6-a7b8-4901-c234-56789abcdef0',
            type: 'email',
            label: 'Email Address',
            placeholder: 'your.email@example.com',
            required: true,
            order: 1,
          },
        ],
        order: 1,
        showInfo: true,
      },
    ],
    createdAt: 1705570500000,
    updatedAt: 1706200800000,
  },
  {
    id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
    title: 'Event Registration',
    description: 'Register for upcoming company events',
    sections: [
      {
        id: 'e5f6a7b8-c9d0-4123-e456-789abcdef012',
        title: 'Event Details',
        description: 'Select your preferred events',
        fields: [
          {
            id: 'f6a7b8c9-d0e1-4234-f567-89abcdef0123',
            sectionId: 'e5f6a7b8-c9d0-4123-e456-789abcdef012',
            type: 'select',
            label: 'Event Type',
            placeholder: 'Choose an event',
            required: true,
            order: 1,
          },
        ],
        order: 1,
        showInfo: true,
      },
    ],
    createdAt: 1705916400000,
    updatedAt: 1706448600000,
  },
  {
    id: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
    title: 'Product Order Form',
    description: 'Order products from our catalog',
    sections: [
      {
        id: 'a7b8c9d0-e1f2-4345-a678-9abcdef01234',
        title: 'Order Information',
        description: 'Product selection and quantities',
        fields: [
          {
            id: 'b8c9d0e1-f2a3-4456-b789-abcdef012345',
            sectionId: 'a7b8c9d0-e1f2-4345-a678-9abcdef01234',
            type: 'number',
            label: 'Quantity',
            placeholder: '0',
            required: true,
            order: 1,
          },
        ],
        order: 1,
        showInfo: true,
      },
    ],
    createdAt: 1706175900000,
    updatedAt: 1706781300000,
  },
  {
    id: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
    title: 'Newsletter Subscription',
    description: 'Subscribe to our monthly newsletter',
    sections: [
      {
        id: 'c9d0e1f2-a3b4-4567-c890-def0123456789',
        title: 'Subscription Preferences',
        description: 'Choose your newsletter preferences',
        fields: [
          {
            id: 'd0e1f2a3-b4c5-4678-d901-ef0123456789a',
            sectionId: 'c9d0e1f2-a3b4-4567-c890-def0123456789',
            type: 'checkbox',
            label: 'Marketing Updates',
            placeholder: '',
            required: false,
            order: 1,
          },
        ],
        order: 1,
        showInfo: true,
      },
    ],
    createdAt: 1706628000000,
    updatedAt: 1707123000000,
  },
  {
    id: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
    title: 'Support Ticket Form',
    description: 'Report technical issues and get support',
    sections: [
      {
        id: 'e1f2a3b4-c5d6-4789-e012-3456789abcdef',
        title: 'Issue Details',
        description: 'Describe your technical issue',
        fields: [
          {
            id: 'f2a3b4c5-d6e7-4890-f123-456789abcdef0',
            sectionId: 'e1f2a3b4-c5d6-4789-e012-3456789abcdef',
            type: 'textarea',
            label: 'Problem Description',
            placeholder: 'Describe the issue you are experiencing',
            required: true,
            order: 1,
          },
        ],
        order: 1,
        showInfo: true,
      },
    ],
    createdAt: 1706875800000,
    updatedAt: 1707401100000,
  },
];
