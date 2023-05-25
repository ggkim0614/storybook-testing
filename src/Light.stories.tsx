import type { Meta, StoryObj } from '@storybook/react';

import Light from './Light';

const meta: Meta<typeof Light> = {
	component: Light,
	title: 'Light',
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: { type: 'radio' },
			options: ['green', 'red', 'yellow'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		variant: 'green',
	},
};

export const Yellow: Story = {
	args: {
		variant: 'yellow',
	},
};

export const Red: Story = {
	args: {
		variant: 'red',
	},
};

export const Another: Story = {
	args: {
		variant: 'red',
	},
	render: (args) => <Light {...args} />,
};

export const Grouped: Story = {
	render: (args) => (
		<div
			style={{
				padding: '15px',
				borderRadius: '15px',
				display: 'flex',
				flexDirection: 'column',
				gap: 10,
				border: '5px solid #292929',
				width: 'max-content',
			}}
		>
			<Light variant="green" />
			<Light variant="yellow" />
			<Light variant="red" />
		</div>
	),
};
