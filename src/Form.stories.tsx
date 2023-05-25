import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import Form from './Form';

const meta: Meta<typeof Form> = {
	component: Form,
	title: 'Form',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const email = canvas.getByLabelText('Email');
		const question = canvas.getByLabelText('Question');

		const submitBtn = canvas.getByRole('button', { name: 'Post question' });

		await expect(submitBtn).toBeInTheDocument();
		await expect(email).toBeInTheDocument();
		await expect(question).toBeInTheDocument();
	},
};

export const EmptySubmit: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const submitBtn = canvas.getByRole('button', { name: 'Post question' });

		await userEvent.click(submitBtn);

		await expect(canvas.getByText(/enter your email/i)).toBeInTheDocument();
		await expect(canvas.getByText(/enter a question/i)).toBeInTheDocument();
	},
};

export const InvalidEmailSubmit: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const email = canvas.getByLabelText(/email/i);

		const submitBtn = canvas.getByRole('button', { name: 'Post question' });

		await userEvent.type(email, 'iAmNotEmail');

		await userEvent.click(submitBtn);

		await expect(canvas.getByText(/valid email/i)).toBeInTheDocument();
		await expect(canvas.getByText(/enter a question/i)).toBeInTheDocument();
	},
};

export const ValidQuestionSubmit: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const email = canvas.getByLabelText(/email/i);
		const question = canvas.getByLabelText(/question/i);

		const submitBtn = canvas.getByRole('button', { name: 'Post question' });

		await userEvent.type(email, 'test1234@test.com');
		await userEvent.type(question, 'This is a valid question, right?');

		await userEvent.click(submitBtn);

		await expect(canvas.queryByText(/enter email/i)).not.toBeInTheDocument();
		await expect(
			canvas.queryByText(/enter a question/i)
		).not.toBeInTheDocument();
		await expect(
			canvas.getByText(/successfully submitted!/i)
		).toBeInTheDocument();
	},
};
