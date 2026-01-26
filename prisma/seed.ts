import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//**
//  * in package json: "prisma": {
// * "seed": "ts-node-dev prisma/seed.ts"
// *},
//  * yarn prisma db seed
//  */

async function main() {

    await prisma.program.deleteMany({});
    await prisma.people.deleteMany();
    await prisma.effortEntry.deleteMany();

    await prisma.people.createMany({
        data: [
            {
                firstName: "Abigail",
                lastName: "Cohen",
                salary: 85000,
                salaryEnteredDate: "2025-09-02",
                program: "DIG-DEV"
            },
        ]
    });

    await prisma.program.createMany({
        data: [
            {
                program: "DIG-DEV",
                lastPiReportDate: "2025-12-04",
                lastPiReportBalance: 80000.00,
                title: "OEM - EAC",
                budget: 1390460.00,
                startDate: "2023-01-01",
                endDate: "2026-02-01",
                funder: "OEM",
                pi: "Lucas Marxen",
                fundingMechanism: "Contract",
                status: "Funded",
                projectAccount: "833872",
                taskNumber: null,
                indirectRate: 37.2
            },
        ]
    });

}



main().then(() => {
    console.log("Data seeded...");
});
