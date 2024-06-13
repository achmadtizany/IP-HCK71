'use strict';
const axios = require("axios")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const response = await axios.get("https://valorant-api.com/v1/agents")

    const data = response.data.data.map((agent) => {
      let { displayName, description, developerName, bustPortrait, role, abilities } = agent
      let roleName = role ? role.displayName : null;
      let roleDesc = role ? role.description : null;

      let agentAbilities = []
      abilities.forEach((ability) => {
        // const { displayName, description } = ability


        agentAbilities.push({
          abilityName: ability.displayName,
          abilityDescription: ability.description,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      })


      return {
        
        agentName: displayName,
        nickName: developerName,
        imgUrl: bustPortrait,
        description: description,
        agentDescription: roleDesc,
        agentRole: roleName,
        abilities: JSON.stringify(agentAbilities),

        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert("Agents", data, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Agents", null, {cascade: true, truncate:true, restartIdentity:true})
  }
};
