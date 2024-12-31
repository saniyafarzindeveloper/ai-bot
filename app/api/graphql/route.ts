// //this file is responsible for the proxy route
// import { serverClient } from "@/lib/server/serverClient";
// import { gql } from "@apollo/client";
// import { NextRequest, NextResponse } from "next/server";

// const corsHeaders = {
//     "Access-Control-Allow-Origin" : "*",
//     "Access-Control-Allow-Methods" : "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers" : "Content-Type, Authorization"
// }
// export async function POST(request: NextRequest){

//     const {query, variables} = await request.json();

//     console.log('DEBUG 1', query);
//     console.log('DEBUG 2', variables);
//     try {
//         let result;
//         if(query.trim().startsWith("mutation")){
//             //handle mutation
//             result = await serverClient.mutate({
//                 mutation: gql`${query}`,
//                 variables
//             })
//         }
//         else{
//             //handle query
//             result = await serverClient.query({
//                 query: gql`${query}`,
//                 variables
//             })
//         }
//         const data = result.data;
//         console.log("DATA FROM API", data);
//         return NextResponse.json({
//             data,
//         },{
//             headers: corsHeaders
//         })
//     } catch (error) {
//         console.log("ERROR IN API", error);
//         return NextResponse.json(error, {
//             status: 500
//         })
//     }
// }


import { serverClient } from "@/lib/server/serverClient";
import { gql } from "@apollo/client";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: NextRequest) {
    const { query, variables } = await request.json();

    console.log('DEBUG 1: Received query', query);
    console.log('DEBUG 2: Received variables', variables);

    try {
        let result;
        if (query.trim().startsWith("mutation")) {
            console.log("DEBUG 3: Executing Mutation:", query);
            console.log("DEBUG 4: With Variables:", variables);

            result = await serverClient.mutate({
                mutation: gql`${query}`,
                variables
            });

            // Log the full result to check for unexpected response structure
            console.log("DEBUG 5: Mutation result", result);
        } else {
            console.log("DEBUG 6: Executing Query:", query);
            result = await serverClient.query({
                query: gql`${query}`,
                variables
            });
        }

        const data = result?.data;
        if (data) {
            console.log("DEBUG 7: Data returned from mutation", data);
            return NextResponse.json({ data }, { headers: corsHeaders });
        } else {
            console.error("DEBUG 8: No data returned from mutation");
            return NextResponse.json({ error: "No data returned from mutation" }, { status: 500 });
        }
    } catch (error) {
        console.error("ERROR IN API", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, {
            status: 500,
        });
    }
}
