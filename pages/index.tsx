import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { requestProvider } from 'webln'
import { useState } from 'react'

export default function Home() {

  const [nodeInfo, setNodeInfo] = useState('');
  const [amount, setAmount] = useState(0);
  const [webln, setWebln] = useState('');
  const [paymentRequest, setPaymentRequest] = useState('');
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  
  async function loadRequestProvider() {
    const webln = await requestProvider();
    const nodeInfo = await webln.getInfo();
    setNodeInfo(nodeInfo.node.alias);
    setWebln(webln)
  }

  async function handleInvoice(e) {
    e.preventDefault();
    const invoice = await webln.makeInvoice(amount);
    console.log(invoice);
    setPaymentRequest(invoice.paymentRequest);
  }

  async function handlePayment() {
    await webln.sendPayment(paymentRequest);
  }

  async function handleSignature(e) {
    e.preventDefault();
    const signature = await webln.signMessage(message);
    setSignature(signature.signature);
  }

  async function verifyMessage() {
    const verification = await webln.verifyMessage(signature, message);
    console.log(verification)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Lightning App template Next x Webln</title>
        <meta name="description" content="nextjs x webln" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js</a> x <a href="https://www.webln.guide/">WebLN</a>
        </h1>

        <button className={styles.button} onClick={loadRequestProvider}> ⚡️ Connect to provider </button>

        <div className={styles.grid}>
          <a className={styles.card}>
            <h2>Node Info &rarr;</h2>
            <p>Connected to: {nodeInfo}</p>
          </a>

          <a className={styles.card}>
            <h2>Make Invoice &rarr;</h2>
            <form onSubmit={handleInvoice}>
              <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
              /> sats
              <br/>
              <button>Create Invoice</button>
            </form>
          </a>

          <a className={styles.card}>
            <h2>Pay the invoice that was created &rarr;</h2>
            <button onClick={handlePayment}>Pay Invoice</button>
          </a>

          <a className={styles.card}>
            <h2>Sign Message &rarr;</h2>
            <form onSubmit={handleSignature}>
              <input
              type="string"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
              /> 
              <br/>
              <button>Sign Message</button>
            </form>
          </a>

          <a className={styles.card}>
            <h2>Verify Signature &rarr;</h2>
            <button onClick={verifyMessage}>Verify Signature</button>
          </a>

        </div>
      </main>

      <footer className={styles.footer}>
      <a href="/" aria-label="Bitcoin design community logo">
      <svg id="" width="50" height="50" viewBox="0 0 75 75" fill="orange" xmlns="http://www.w3.org/2000/svg">
      <path id="" fill-rule="evenodd" clip-rule="evenodd" d="M28.4328 73.8804C48.5467 78.8874 68.8814 66.6276 73.8853 46.5506C78.877 26.4613 66.6369 6.06523 46.5108 1.1196C26.446 -3.88738 6.12358 8.37236 1.11964 28.4494C-3.8843 48.5264 8.35573 68.8611 28.4328 73.8804ZM46.924 23.2327C52.1323 25 55.9313 27.6141 55.2573 32.6215C54.7426 36.2665 52.7573 38.0461 50.0122 38.672C53.7622 40.5989 55.6372 43.5198 53.9215 48.6377C51.7892 55.0564 46.5318 55.6333 39.4975 54.3814L37.8799 61.2174L33.7622 60.2233L35.3799 53.4978C34.3382 53.24 33.2475 52.97 32.0956 52.6632L30.4779 59.4379L26.3603 58.4438L27.9779 51.6077C27.4118 51.4436 26.8231 51.3022 26.2254 51.1586C25.8398 51.066 25.4505 50.9724 25.0612 50.8713L19.6936 49.6195L21.6421 44.8699C21.6421 44.8699 24.7181 45.6553 24.6691 45.6063C25.8088 45.864 26.3358 45.1276 26.5441 44.6121L29.0441 33.8119C29.1237 33.8365 29.1881 33.8488 29.2524 33.861C29.3168 33.8733 29.3811 33.8856 29.4608 33.9101C29.3577 33.8387 29.2598 33.8134 29.1736 33.7912C29.1266 33.7791 29.083 33.7679 29.0441 33.7506L30.8701 26.0309C30.9313 25.1963 30.6127 24.104 28.946 23.6868C29.0563 23.6254 25.9804 22.9504 25.9804 22.9504L27.022 18.5689L32.696 19.9312C33.1372 20.0356 33.5815 20.1276 34.0257 20.2197C34.4699 20.3117 34.9142 20.4037 35.3554 20.5081L36.973 13.7334L41.1397 14.7275L39.571 21.3549C40.6617 21.5758 41.7647 21.8335 42.8554 22.0913L44.424 15.4639L48.5416 16.458L46.924 23.2327ZM34.106 47.8758C37.4167 48.7261 44.8825 50.6437 45.9926 45.9131C47.1099 41.1193 40.111 39.6102 36.5992 38.853C36.182 38.763 35.814 38.6837 35.5147 38.6107L33.3823 47.6926C33.5919 47.7437 33.835 47.8062 34.106 47.8758ZM37.0716 34.594C39.833 35.308 46.1186 36.9332 47.1323 32.6215C48.1606 28.2939 42.2945 27.0373 39.3933 26.4158C39.0445 26.3411 38.7386 26.2756 38.4926 26.215L36.5073 34.4501C36.6725 34.4908 36.8619 34.5398 37.0716 34.594Z"></path>
      </svg>
      </a>

      <p> ⚡️ send sats to jose@getalby.com</p>

        <a rel="me" href="https://github.com/jsahagun91/webln-next" title="jsahagun on Github">  <p> next.js lightning app template </p>
        <svg width="30" height="30" fill="orange" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.999 3C8.373 3 3 8.373 3 15.001C3 20.302 6.438 24.8 11.207 26.387C11.807 26.497 12.026 26.127 12.026 25.809C12.026 25.524 12.016 24.769 12.01 23.768C8.672 24.493 7.968 22.159 7.968 22.159C7.422 20.773 6.636 20.404 6.636 20.404C5.546 19.659 6.718 19.675 6.718 19.675C7.922 19.76 8.556 20.912 8.556 20.912C9.626 22.746 11.365 22.216 12.048 21.909C12.157 21.134 12.467 20.605 12.81 20.305C10.145 20.002 7.344 18.973 7.344 14.374C7.344 13.064 7.812 11.993 8.579 11.154C8.456 10.85 8.044 9.63 8.697 7.978C8.697 7.978 9.705 7.655 11.997 9.208C12.954 8.942 13.981 8.809 15.001 8.804C16.02 8.809 17.047 8.942 18.005 9.208C20.296 7.655 21.302 7.978 21.302 7.978C21.957 9.63 21.545 10.85 21.421 11.154C22.19 11.993 22.654 13.064 22.654 14.374C22.654 18.984 19.848 19.998 17.175 20.295C17.606 20.665 17.99 21.398 17.99 22.517C17.99 24.121 17.975 25.415 17.975 25.809C17.975 26.13 18.191 26.503 18.8 26.386C23.565 24.795 27 20.301 27 15.001C27 8.373 21.627 3 14.999 3Z"></path>
        </svg>
        </a>
      </footer>
    </div>
  )
}
