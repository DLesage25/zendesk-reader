const newSettings = {};

newSettings.program = (program) => {
	return {
		bambooId: 'updateThis',
		goal: 'touches',
		id: program,
		isActive: true,
		managerId: 'updateThis',
		prettyName: 'PartnerHero-' + program
	}
}

export default newSettings;