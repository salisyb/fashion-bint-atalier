import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../images/invoice/logo.jpeg";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: "30px",
    paddingHorizontal: "30px",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: "150px",
    height: "150px",
  },
  logoContainer: {
    width: "150px",
    height: "150px",
    overflow: "hidden",
    borderRadius: "10px",
    borderWidth: 2,
    borderColor: "yellow",
  },
  invoice: {
    display: "flex",
    alignSelf: "flex-end",
    textAlign: "right",
    fontSize: "18px",
    fontWeight: "bold",
  },
  companyTitle: {
    display: "flex",
    alignSelf: "flex-end",
    textAlign: "right",
    fontSize: "18px",
    fontWeight: "600",
  },
  text: {
    display: "flex",
    alignSelf: "flex-end",
    fontSize: "14px",
    textAlign: "left",
  },
  subHeaderWrapper: {
    backgroundColor: "#f0f3f4",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "10px",
    paddingVertical: "20px",
    paddingHorizontal: "15px",
    borderRadius: "15px",
  },
  invoiceInfoWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textBoxLeftRight: {
    marginRight: "20px",
  },
  tableHeader: {
    paddingHorizontal: "20px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  tableName: {
    width: "30%",
    fontSize: "13px",
  },
  fabric: {
    width: "10%",
    fontSize: "13px",
  },
  price: {
    width: "20%",
    fontSize: "13px",
  },
  discount: {
    width: "20%",
    fontSize: "13px",
  },
  amount: {
    width: "20%",
    fontSize: "13px",
  },
  divider: {
    width: "100%",
    height: 0.5,
    backgroundColor: "#cecece",
    marginVertical: "5px",
  },
});

// Create Document Component
export const MyDocument = ({ data }) => {
  const initialAmount = 0;

  const totalBalance = data.reduce(
    (initialAmount, item) =>
      initialAmount +
      (Number(item.amount) * Number(item.no_of_attire) -
        (item.discount ? Number(item.discount) : 0)),
    initialAmount
  );

  const initialPaidAmount = 0;

  const totalAmountPaid = data.reduce(
    (initialAmount, item) => initialAmount + Number(item.amount_paid),
    initialPaidAmount
  );

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        {/* header of the document */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image src={logo} style={styles.logo} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.invoice}>Invoice</Text>
            <Text style={styles.companyTitle}>Bint Atelier Enterprises</Text>
            <Text style={styles.text}>
              No 454 Karkasara Adljacent MGK pharmacy before
            </Text>
            <Text style={styles.text}>Masallachin Bilal, Kano, Nigeria</Text>
            <Text style={styles.text}>Kano Kano</Text>
            <Text style={styles.text}>NG</Text>
            <Text style={styles.text}>07046660046</Text>
            <Text style={styles.text}>Bintatelier@gmail.com</Text>
            <Text style={styles.text}>Tax Reg No. : BN 3077315</Text>
          </View>
        </View>

        {/* end of the document header */}

        {/* start of subheader */}
        <View style={styles.subHeaderWrapper}>
          <View>
            <Text style={{ fontSize: "14px", fontWeight: "light" }}>
              BILL TO:
            </Text>
            <Text
              style={{ fontSize: "14px", fontWeight: "bold", marginTop: "5px" }}
            >
              {data[0].client &&
                data[0].client.first_name + " " + data[0].client.last_name}
            </Text>
          </View>
          <View style={styles.invoiceInfoWrapper}>
            <View style={styles.textBoxLeftRight}>
              <Text style={styles.text}>Invoice #</Text>
              <Text style={{ ...styles.text, ...{ marginVertical: "6px" } }}>
                Date
              </Text>
              <Text style={styles.text}>Collection Date</Text>
            </View>
            <View>
              <Text style={styles.text}>
                {Math.floor(Math.random() * 10000000)}
              </Text>
              <Text style={{ ...styles.text, ...{ marginVertical: "6px" } }}>
                {moment().format("MMM D YYYY")}
              </Text>
              <Text style={styles.text}>
                {" "}
                {moment(data[0].collection_date).format("MMM D YYYY")}
              </Text>
            </View>
          </View>
        </View>

        {/* end of the sub header */}

        {/*  content */}

        <View style={{ marginTop: "10px" }}>
          {/* table header */}
          <View style={styles.divider} />

          <View style={styles.tableHeader}>
            <Text style={styles.tableName}>Name</Text>
            <Text style={styles.fabric}>Fabric</Text>
            <Text style={styles.price}>Price</Text>
            <Text style={styles.discount}>Discount</Text>
            <Text style={styles.amount}>Amount</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.tableHeader}>
            <Text style={{ ...styles.tableName, ...{ fontSize: "11px" } }}>
              {`this is a really long line\n`}
              <Text style={{ fontSize: "10px" }}>
                This is the description of the text
              </Text>
            </Text>
            <Text style={{ ...styles.fabric, ...{ fontSize: "11px" } }}>
              Fabric
            </Text>
            <Text style={{ ...styles.price, ...{ fontSize: "11px" } }}>
              Price
            </Text>
            <Text style={{ ...styles.discount, ...{ fontSize: "11px" } }}>
              Discount
            </Text>
            <Text style={{ ...styles.amount, ...{ fontSize: "11px" } }}>
              Amount
            </Text>
          </View>
          <View style={styles.divider} />
        </View>

        {/*  content  end*/}

        {/* payment instruction start */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <View
            style={{
              paddingHorizontal: "15px",
              paddingVertical: "10px",
            }}
          >
            <Text>Payment Instruction</Text>
            <Text style={{ fontSize: "14px" }}>Account Number: 1017522000</Text>
            <Text style={{ fontSize: "14px" }}>Bank Name: Zenith Bank</Text>
            <Text style={{ fontSize: "14px" }}>
              Account Name: Bint Atelier Enterprises
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginRight: "20px", fontSize: "14px" }}>
              <Text>Subtotal</Text>
              <Text>Total</Text>
              <Text>Amount Paid</Text>
            </View>
            <View style={{ fontSize: "14px" }}>
              <Text>
                <CurrencyFormat
                  value={totalBalance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"#"}
                />
              </Text>
              <Text>
                <CurrencyFormat
                  value={totalBalance}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"#"}
                />
              </Text>
              <Text>
                <CurrencyFormat
                  value={totalAmountPaid}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"#"}
                />
              </Text>
            </View>
            {/* <View style={styles.divider} /> */}
          </View>
        </View>

        {/* amount due container */}
        <View
          style={{
            display: "flex",
            alignSelf: "flex-end",
            backgroundColor: "#f0f3f4",
            marginVertical: "10px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <Text
            style={{
              fontSize: "13px",
              marginRight: "80px",
              marginBottom: "5px",
            }}
          >
            Amount Due
          </Text>
          <Text style={{ display: "flex", alignSelf: "flex-end" }}>
            <CurrencyFormat
              value={totalBalance - totalAmountPaid}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"#"}
            />
          </Text>
        </View>

        {/* disclaimer note */}
        <View style={{ marginTop: "10px" }}>
          <Text style={{ fontSize: "14px" }}>
            Dear Esteemed Client You are to either pay 50% deposit or full
            payment of your service charge to enable us to start processing your
            outfits. Please send Proof of Payment to enable us serve you better.
            Charges of N2000 applies 3 days after your date of collection. NO
            REFUND ❌ THANK YOU
          </Text>
        </View>
        <View style={styles.divider} />
        <Text style={{ fontSize: "13px" }}>
          By making Payment, the customer agrees to the services and conditions
          described in this document.
        </Text>

        {/* sign container */}
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: "50px",
            marginTop: "10px",
          }}
        >
          {/* bint sign */}
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text style={{ fontSize: "16px" }}>Bint Atelier Enterprises</Text>
            <Image
              src={
                "https://i.postimg.cc/66F6VvPg/bint-sign-removebg-preview.png"
              }
              style={{ width: "80px" }}
            />
            <View style={styles.divider} />
            <Text>Aug 13 2022</Text>
          </View>

          {/* custormer sign */}
          <View style={{ display: "flex", alignItems: "center" }}>
            <Text style={{ fontSize: "16px" }}>
              {data[0].client &&
                data[0].client.first_name + " " + data[0].client.last_name}
            </Text>
            <View style={{ height: "80px", width: "140px" }} />
            <View style={styles.divider} />
            <Text>Aug 13 2022</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
