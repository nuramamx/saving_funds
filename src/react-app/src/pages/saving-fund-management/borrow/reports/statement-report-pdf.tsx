import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import React from 'react';
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
          <Text style={styles.title}>TRANSACCIONES</Text>
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

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <View style={styles.table}>
          <Text style={styles.tableHeader}>AÑO</Text>
          <Text style={styles.tableHeader}>FECHA</Text>
          <Text style={styles.tableHeader}>TIPO</Text>
          <Text style={styles.tableHeader}>MONTO</Text>
          <Text style={styles.tableHeader}>TOTAL</Text>
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
      </View>
    </Page>
  </Document>
);

export default StatementReportPDF;