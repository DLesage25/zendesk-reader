const newSettings = {};

newSettings.program = (programId) => {
	return {
		bambooId: 'updateThis',
		goal: 'touches',
		id: programId,
		isActive: true,
		managerEmail: 'updateThis',
		managerId: 'updateThis',
		prettyName: programId.charAt(0).toUpperCase() + programId.slice(1), //capitalize first letter
		startDate: null,
		zendeskURL: 'updateThis'
	}
}

export default newSettings;