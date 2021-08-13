// <template>
//   <div>
//     <div v-for="status of statuses" :key="status">{{status}}</div>
//   </div>
// </template>

// <script>
// import axios from 'axios'
// import services from '~/static/convertcsv.json'

// export default {
//   data() {
//     return {
//       statuses: ['Running']
//     }
//   },
//   mounted() {
//     this.start()
//   },
//   methods: {
//     async start() {
//       for (const service of services) {
//         const id = await this.getHospital(service.hospitalCode)
//         console.log(id)
//         axios
//           .post(`${process.env.strapiURI}/services`, {
//             nameSirius: service.nameSirius,
//             nameBasins: service.nameBasins,
//             code: service.code,
//             hospital: id
//           })
//           .then(response => {
//             this.statuses.push(`Done ${service.nameSirius} at ${id}`)
//           })
//           .catch(error => {
//             this.statuses.push(`An error occurred: ${error}`)
//           })
//       }
//     },
//     async getHospital(code) {
//       const hospital = await axios.get(`${process.env.strapiURI}/hospitals?code=${code}`)
//       return hospital.data && hospital.data[0] ? hospital.data[0]._id : null
//     }
//   }
// }
// </script>