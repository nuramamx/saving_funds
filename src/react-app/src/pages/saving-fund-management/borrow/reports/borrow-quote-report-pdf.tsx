import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet, Font } from '@react-pdf/renderer';
import ToMoney from '../../../../core/util/conversions/money-conversion';
import BorrowQuoteReportDataSpec from '../../../../core/interfaces/specs/base/borrow-quote-report-data-spec';

const styles = StyleSheet.create({
  page: {
    padding: 20
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
    fontFamily: 'Helvetica-Bold',
    marginTop: 30,
    flex: 8,
    padding: 0
  },
  section: {
    flexDirection: 'row',
    margin: 2
  },
  cellSmall: {
    flex: 3
  },
  cellTitle: {
    flex: 8,
    padding: 0,
    fontFamily: 'Helvetica-Bold',
  },
  cell: {
    flex: 8,
    padding: 0
  },
  table: {
    flexDirection: 'row',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    borderLeft: '1px solid black'
  },
  tableHeader: {
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

type BorrowQuoteReportPDFParams = {
  data: BorrowQuoteReportDataSpec;
};

// Create Document Component
const BorrowQuoteReportPDF = ({ data }: BorrowQuoteReportPDFParams) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.container}>
        <View style={styles.section} fixed>
          <Image src={`${process.env.PUBLIC_URL}/logo.png`} style={{ width: '100px', height: '100px' }} />
          <Text style={styles.title}>COTIZACIÓN DE DESCUENTO POR CRÉDITO</Text>
          <Image src={`${process.env.PUBLIC_URL}/setepid-logo.jpg`} style={{ width: '80px' }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>NOMBRE: </Text>
          <Text style={styles.cell}>{data.associateName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellSmall}>CANTIDAD SOLICITADA: </Text>
          <Text style={styles.cell}>{`${ToMoney(data.requestedAmount)}`}</Text>
        </View>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>PLAZO:</Text>
          <Text style={styles.cell}>{data.period}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>TOTAL CON INTERÉS:</Text>
          <Text style={styles.cell}>{ToMoney(data.totalWithInterests)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>2% FONDO DE GARANTÍA:</Text>
          <Text style={styles.cell}>{ToMoney(data.guaranteeFund)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>TOTAL A PAGAR:</Text>
          <Text style={styles.cell}>{ToMoney(data.totalDue)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>DESCUENTO QUINCENAL:</Text>
          <Text style={styles.cell}>{ToMoney(data.payment)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.cellTitle}>NÚMERO DE PAGOS:</Text>
          <Text style={styles.cell}>{data.numberPayments}</Text>
        </View>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <Text>
          DE ACUERDO CON EL REGLAMENTO, ES IMPORTANTE RECORDAR QUE DURANTE LA VIGENCIA DEL CRÉDITO ACTIVO:
        </Text>

        <View style={styles.padding}></View>
        <View style={styles.padding}></View>

        <Text>
          - NO SERÁ POSIBLE REALIZAR EL RETIRO DE RENDIMIENTOS
        </Text>
        <Text>
          - NO ESTA PERMITIDO SALIR DEL FONDO DE AHORRO
        </Text>
        <Text>
          - NO SE PUEDE DISMINUIR EL MONTO DE AHORRO
        </Text>
        <Text>
          - LA PERMANENCIA EN EL SINDICATO ES OBLIGATORIA
        </Text>
        <Text>
          - EN CASO DE FALLECIMIENTO O DESPIDO SE CUBRIRÁ EL ADEUDO PENDIENTE CON EL SALDO   ACUMULADO DEL AHORRO, DE NO SER SUFICIENTE DEBERA CUBRIR LA CANTIDAD RESTANTE
        </Text>
        <Text>
          - EN CASO DE FALLECIMIENTO EL BENEFICIARIO DEL FONDO DE AHORRO SERÁ EL RESPONSABLE DE LIQUIDAR EL ADEUDO FALTANTE
        </Text>
      </View>
    </Page>
  </Document>
);

export default BorrowQuoteReportPDF;