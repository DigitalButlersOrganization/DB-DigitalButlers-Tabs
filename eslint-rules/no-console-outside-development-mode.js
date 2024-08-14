/* eslint-disable unicorn/no-null */
const rule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Disallow console.log outside of this.devMode condition',
			category: 'Possible Errors',
			recommended: true,
		},
		fixable: null,
		schema: [],
	},

	create(context) {
		return {
			CallExpression(node) {
				if (
					node.callee.type === 'MemberExpression' &&
					node.callee.object.name === 'console' &&
					node.callee.property.name === 'log'
				) {
					let currentNode = node;
					let isInsideDevelopmentMode = false;

					while (currentNode.parent) {
						if (
							currentNode.parent.type === 'IfStatement' &&
							currentNode.parent.test.type === 'MemberExpression' &&
							currentNode.parent.test.object.type === 'ThisExpression' &&
							currentNode.parent.test.property.name === 'devMode'
						) {
							isInsideDevelopmentMode = true;
							break;
						}
						currentNode = currentNode.parent;
					}

					if (!isInsideDevelopmentMode) {
						context.report({
							node,
							message: "console.log is only allowed inside 'this.devMode' condition",
						});
					}
				}
			},
		};
	},
};

export default rule;
