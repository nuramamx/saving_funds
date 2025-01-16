import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import StatementReportDataSpec from '../../../../core/interfaces/specs/base/statement-report-data-spec';
import StatementReportListSpec from '../../../../core/interfaces/specs/list/statement-report-list-spec';
import ToMoney from '../../../../core/util/conversions/money-conversion';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  padding: {
    paddingTop: '10px'
  },
  title: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 30,
    flex: 8,
    padding: 0
  },
  section: {
    flexDirection: 'row',
    margin: 2
  },
  cellSmall: {
    flex: 2
  },
  cell: {
    flex: 8,
    padding: 0
  },
  cellTitle: {
    flex: 8,
    padding: 0,
    fontFamily: 'Helvetica-Bold',
  },
  table: {
    flexDirection: 'row',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black'
  },
  tableHeader: {
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    flex: 1,
    padding: 4,
    borderRight: '1px solid black',
    textAlign: 'center'
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black',
  },
  tableCell: {
    flex: 1,
    padding: 4,
    borderRight: '1px solid black',
    textAlign: 'center'
  },
});

type StatementReportPDFParams = {
  data: StatementReportDataSpec
  list: StatementReportListSpec[];
};

// Create Document Component
const StatementReportPDF = ({ data, list }: StatementReportPDFParams) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.container}>
        <View style={styles.section} fixed>
          <Image src={`${process.env.PUBLIC_URL}/logo.png`} style={{ width: '100px', height: '100px' }} />
          <Text style={styles.title}>ESTADO DE CUENTA</Text>
          <Image src={`${process.env.PUBLIC_URL}/setepid-logo.jpg`} style={{ width: '80px' }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>NO. SOCIO: </Text>
          <Text style={styles.cell}>{data.associateCode}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>NOMBRE: </Text>
          <Text style={styles.cell}>{data.associateName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>FECHA: </Text>
          <Text style={styles.cell}>{data.dateRange}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.cellSmall}>APORTACIÓN: </Text>
          <Text style={styles.cell}>{ToMoney(data.frequentContribution)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>NO. {data.isFortnightly ? 'QUINCENAS' : 'MESES'}:</Text>
          <Text style={styles.cell}>{data.countFrequency}</Text>
        </View>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <View style={styles.table}>
          <Text style={styles.tableHeader}>AÑO</Text>
          <Text style={styles.tableHeader}>SALDO INICIAL</Text>
          <Text style={styles.tableHeader}>TOTAL APS.</Text>
          <Text style={styles.tableHeader}>TASA %</Text>
          <Text style={styles.tableHeader}>RENDIMIENTOS</Text>
          <Text style={styles.tableHeader}>RETIROS</Text>
          <Text style={styles.tableHeader}>TOTAL NETO</Text>
        </View>

        {list.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.year}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.initialBalance)}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.contributionSummarized)}</Text>
            <Text style={styles.tableCell}>{row.annualInterestRate}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.yields)}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.withdrawalsSummarized)}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.netTotal)}</Text>
          </View>
        ))}
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>CANTIDAD QUE SE QUEDA EN EL FONDO DE AHORRO:</Text>
          <Text style={styles.cell}>{ToMoney(data.amountToWithhold)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>CANTIDAD QUE PUEDE RETIRAR:</Text>
          <Text style={styles.cell}>{ToMoney(data.amountAvailableToWithdrawal)}</Text>
        </View>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <Text break>
          POR REGLAMENTO: EL PRIMER RETIRO DE AHORRO MÁS RENDIMIENTOS, PUEDE SOLICITARSE A PARTIR DE CONTAR CON 27 MESES DE HABER INGRESADO AL FONDO DE AHORRO, POSTERIORMENTE PUEDE SOLICITARLO ANUALMENTE.
          EN CASO DE SOLICITAR RETIRO DE AHORRO MÁS RENDIMIENTOS, DEBE PERMANECER EN EL FIDEICOMISO EL EQUIVALENTE A 3 MESES DE AHORRO.
          SI CUENTA CON UN PRÉSTAMO ACTIVO EN EL FONDO DE AHORRO, NO ES POSIBLE SOLICITAR EL RETIRO DE AHORRO MÁS RENDIMIENTOS, HASTA TERMINAR DE PAGAR EL PRÉSTAMO.
          EL RETIRO DE AHORRO MÁS RENDIMIENTOS, APLICA UNICAMENTE PARA AÑO CONCLUIDO.
        </Text>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <View style={{ textAlign: 'center'}}>
          <Text>ESTOY DE ACUERDO CON LA INFORMACIÓN RECIBIDA.</Text>
        </View>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <View style={{ textAlign: 'center'}}>
          <Text>NOMBRE Y FIRMA: _______________________</Text>
        </View>
      </View>
    </Page>
    <Page style={styles.page}>
      <View style={styles.container}>
        <View style={styles.section} fixed>
          <Image src={`${process.env.PUBLIC_URL}/logo.png`} style={{ width: '100px', height: '100px' }} />
          <Text style={styles.title}>ESTADO DE CUENTA</Text>
          <Image src={`${process.env.PUBLIC_URL}/setepid-logo.jpg`} style={{ width: '80px' }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>NO. SOCIO: </Text>
          <Text style={styles.cell}>{data.associateCode}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>NOMBRE: </Text>
          <Text style={styles.cell}>{data.associateName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>FECHA: </Text>
          <Text style={styles.cell}>{data.dateRange}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.cellSmall}>APORTACIÓN: </Text>
          <Text style={styles.cell}>{ToMoney(data.frequentContribution)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>NO. {data.isFortnightly ? 'QUINCENAS' : 'MESES'}:</Text>
          <Text style={styles.cell}>{data.countFrequency}</Text>
        </View>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <View style={styles.table}>
          <Text style={styles.tableHeader}>AÑO</Text>
          <Text style={styles.tableHeader}>SALDO INICIAL</Text>
          <Text style={styles.tableHeader}>TOTAL APS.</Text>
          <Text style={styles.tableHeader}>TASA %</Text>
          <Text style={styles.tableHeader}>RENDIMIENTOS</Text>
          <Text style={styles.tableHeader}>RETIROS</Text>
          <Text style={styles.tableHeader}>TOTAL NETO</Text>
        </View>

        {list.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.year}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.initialBalance)}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.contributionSummarized)}</Text>
            <Text style={styles.tableCell}>{row.annualInterestRate}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.yields)}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.withdrawalsSummarized)}</Text>
            {index === list.length-1 ? (
              <Text style={styles.tableCell}>{ToMoney(data.netBalance)}</Text>
            ) : (
              <Text style={styles.tableCell}>{ToMoney(row.netTotal)}</Text>
            )}
          </View>
        ))}

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>CANTIDAD DISPONIBLE QUE PUEDE RETIRAR:</Text>
          <Text style={styles.cell}>{ToMoney(data.amountAvailableToWithdrawal)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>CANTIDAD QUE RECIBE REDONDEADA:</Text>
          <Text style={styles.cell}>{ToMoney(data.amountAvailableToWithdrawalRounded)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>CANTIDAD QUE SE QUEDA EN EL FONDO DE AHORRO (POR REGLAMENTO):</Text>
          <Text style={styles.cell}>{ToMoney(data.amountToWithhold)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>TOTAL EN FONDO DE AHORRO:</Text>
          <Text style={styles.cell}>{ToMoney(data.netBalance)}</Text>
        </View>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <Text break>
          POR REGLAMENTO: EN CASO DE SOLICITAR RETIRO DE AHORRO MÁS RENDIMIENTOS, DEBE PERMANECER EN EL FIDEICOMISO EL EQUIVALENTE A 3 MESES DE AHORRO.
          SI CUENTA CON UN PRÉSTAMO ACTIVO EN EL FONDO DE AHORRO, NO ES POSIBLE SOLICITAR EL RETIRO DE AHORRO MÁS RENDIMIENTOS, HASTA TERMINAR DE PAGAR EL PRÉSTAMO.
          EL RETIRO DE AHORRO MÁS RENDIMIENTOS, APLICA UNICAMENTE PARA AÑO CONCLUIDO.
        </Text>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <View style={{ textAlign: 'center'}}>
          <Text>ESTOY DE ACUERDO CON LA INFORMACIÓN RECIBIDA.</Text>
        </View>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <View style={{ textAlign: 'center'}}>
          <Text>NOMBRE Y FIRMA: _______________________</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default StatementReportPDF;