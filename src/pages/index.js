import Page from '@/modules/login';
import { getServerSession } from "next-auth/next"

// export async function getServerSideProps(context) {
//     const { req, res } = context;
//     const session = await getServerSession(context.req, context.res);
//     if (session) {
//         return {
//             redirect: {
//                 destination: '/incident-rate',
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: {}
//     };
// }

export default Page;