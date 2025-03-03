import { Page, Text, View, Document, Image, StyleSheet, Font } from '@react-pdf/renderer';
import React from 'react';
import ToMoney from '../../../../core/util/conversions/money-conversion';
import SavingFundTransactionListSpec from '../../../../core/interfaces/specs/list/saving-fund-transaction-list-spec';
import { format } from 'date-fns';

Font.register({ family: 'Courier', src: `${process.env.PUBLIC_URL}/resources/courier.ttf`, fontStyle: 'normal', fontWeight: 'normal' });

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 35
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
    fontFamily: 'Courier',
    flex: 2
  },
  cell: {
    fontFamily: 'Courier',
    flex: 8,
    padding: 0
  },
  cellTitle: {
    flex: 8,
    padding: 0,
    fontFamily: 'Courier-Bold',
  },
  table: {
    fontFamily: 'Courier',
    flexDirection: 'row',
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none'
  },
  tableHeader: {
    fontFamily: 'Courier-Bold',
    fontWeight: 'bold',
    flex: 1,
    padding: 4,
    borderRight: 'none',
    textAlign: 'center'
  },
  tableRow: {
    fontFamily: 'Courier',
    flexDirection: 'row',
    borderBottom: '0.5px solid black',
    borderLeft: 'none',
  },
  tableCell: {
    fontFamily: 'Courier',
    flex: 1,
    padding: 4,
    borderRight: 'none',
    textAlign: 'center'
  },
});

type SavingFundTransactionsReportPDFParams = {
  associateName: string;
  list: SavingFundTransactionListSpec[];
};

const parseTransactionType = (transactionType: string) => {
  switch (transactionType) {
    case 'contribution':
      return 'Aportación';
    case 'yields':
      return 'Rendimientos';
    case 'withdrawal':
      return 'Retiro';
      case 'withdrawal-leave':
        return 'Retiro por baja';
    case 'withdrawal-decease':
      return 'Retiro por fallecimiento';
    default:
      return 'No identificado';
  }
};

// Create Document Component
const SavingFundTransactionsReportPDF = ({ associateName, list }: SavingFundTransactionsReportPDFParams) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.container}>
        <View style={styles.section} fixed>
          <Image src={`${process.env.PUBLIC_URL}/logo.png`} style={{ width: '100px', height: '100px' }} />
          <Text style={styles.title}>MOVIMIENTOS DE FONDO DE AHORRO</Text>
          <Image src={`${process.env.PUBLIC_URL}/setepid-logo.jpg`} style={{ width: '80px' }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>NOMBRE: </Text>
          <Text style={styles.cell}>{associateName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>FECHA: </Text>
          <Text style={styles.cell}>{format(new Date(), 'yyyy-MM-dd')}</Text>
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
            <Text style={styles.tableCell}>{row.transactionDate}</Text>
            <Text style={styles.tableCell}>{parseTransactionType(row.transactionType)}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.amount)}</Text>
            <Text style={styles.tableCell}>{ToMoney(row.netBalance)}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default SavingFundTransactionsReportPDF;