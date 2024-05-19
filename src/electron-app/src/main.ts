import { app, BrowserWindow, ipcMain } from "electron";
import { db } from "./core/persistence/instance";
import AssociateInfo from "@core/domain/interfaces/associate-info";

db.sequelize.sync({ alter: true });

// function save() {
//     Associate.create({
//         workplace: {
//             key: '00009',
//             name: 'Workplace 1',
//             phone: '2221890221'
//         },
//         associate_detail: {
//             dependency_key: 'A1',
//             agreement: '001',
//             category: '1',
//             salary: '100.00',
//             social_contribution: '100.00',
//             fortnightly_contribution: '100.00',
//             request_date: new Date()
//         },
//         fullname: {
//             firstname: 'Christian',
//             paternal_lastname: 'Estrella',
//             maternal_lastname: 'Estrella',
//         },
//         rfc: 'EERC900709890',
//         gender: 'M'
//     }, {
//         include: [{
//             model: Workplace,
//             as: 'workplace'
//         }]
//     })
//     .then((result: any) => {
//         console.log('@@@@@@@@@@@@@@@@@@@');
//         console.log(result);
//     })
//     .catch((error: any) => {
//         console.log('@@@@@@@@@@@@@@@@@@@ Err');
//         console.error(error)
//     });
    
//     // WorkplaceModel.findOne({
//     //     where: { key: '00009' }
//     // })
//     // .then((workplace) => {
//     //     console.log(workplace);
//     // })
//     // .catch((error) => {
//     // });
// }

function createWindow() {
    let win = new BrowserWindow({
        width: 1600,
        height: 1024,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    ipcMain.on('query-database', async (event, args: AssociateInfo) => {
        console.log(event);
        console.log(args);
    });

    createWindow();
});