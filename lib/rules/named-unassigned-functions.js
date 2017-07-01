/**
 * (Method copied from esling `func-names` rule)
 * Checks whether or not a given variable is a function name.
 * @param {escope.Variable} variable - A variable to check.
 * @returns {boolean} `true` if the variable is a function name.
 */
function isFunctionName(variable) {
    return variable && variable.defs[0].type === "FunctionName";
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Require or disallow unassigned functions to be named inline",
            category: "Stylistic Issues",
            recommended: false
        },
        schema: [
            {
                enum: ["always", "never"]
            }
        ]
    },

    create(context) {
        const never = context.options[0] === "never";

        return {
            "FunctionExpression:exit"(node) {
                // Skip recursive functions.
                const nameVar = context.getDeclaredVariables(node)[0];
                if (isFunctionName(nameVar) && nameVar.references.length > 0) {
                    return;
                }

				var parent = node.parent;

                // Check if this is assigned function (or class method definition), if so we don't care
				// todo: what is ExportDefaultDeclaration & AssignmentPattern
				var isAssigned = parent.type.match(/VariableDeclarator|Property|AssignmentExpression|MethodDefinition/);
				if (isAssigned) {
					return;
				}

				var named = !!(node.id && node.id.name);

                if (never) {
                    if (named) {
                        context.report(node, "Unassigned functions should not be named");
                    }
                } else {
					if (!named) {
						context.report(node, "Unassigned functions should be named");
					}
                }
            }
        };
    }
};
