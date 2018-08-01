const newSettings = {};

newSettings.program = (programName, programId) => {
	return {
		bambooId: 'updateThis',
		goal: 'touches',
		id: programId,
		isActive: true,
		managerId: 'updateThis',
		prettyName: programName
	}
}

export default newSettings;