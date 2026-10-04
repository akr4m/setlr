import type { Transaction } from '#/components/fintech/data'

async function createDocument(title: string) {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF()
  pdf.setTextColor(46, 48, 146)
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(28)
  pdf.text('Setlr.', 20, 25)
  pdf.setFontSize(17)
  pdf.text(title, 20, 40)
  pdf.setTextColor(97, 100, 119)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(10)
  pdf.text('Design preview - Sample data - No real money moved', 20, 50)
  return pdf
}
export async function downloadReceipt(details: {
  reference: string
  recipient: string
  amount: number
  currency: string
  status: string
  fee?: number
  note?: string
}) {
  const pdf = await createDocument('Payment receipt')
  const rows = [
    ['Reference', details.reference],
    ['Recipient', details.recipient],
    [
      'Amount',
      `${details.currency} ${details.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    ],
    ['Status', details.status],
    ['Fee', `BDT ${(details.fee || 0).toFixed(2)}`],
    ['Date', '04 October 2026'],
    ['Note', details.note || 'Sample transaction'],
  ]
  rows.forEach(([label, value], i) => {
    const y = 70 + i * 23
    pdf.setTextColor(97, 100, 119)
    pdf.text(label, 20, y)
    pdf.setTextColor(34, 35, 56)
    pdf.text(pdf.splitTextToSize(value, 115), 70, y)
    pdf.setDrawColor(232, 233, 240)
    pdf.line(20, y + 11, 190, y + 11)
  })
  pdf.save(`${details.reference}-receipt.pdf`)
}
export async function downloadStatementPDF(
  items: Transaction[],
  start: string,
  end: string,
) {
  const pdf = await createDocument('Account statement')
  pdf.text(`${start} to ${end} - Setlr ID STL-884021`, 20, 60)
  let y = 76
  items.forEach((item) => {
    if (y > 260) {
      pdf.addPage()
      y = 25
    }
    pdf.setTextColor(34, 35, 56)
    pdf.setFont('helvetica', 'bold')
    pdf.text(item.name, 20, y)
    pdf.text(
      `${item.incoming ? '+' : '-'} ${item.currency} ${item.amount.toFixed(2)}`,
      190,
      y,
      { align: 'right' },
    )
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(97, 100, 119)
    pdf.text(`${item.id} - ${item.date} - ${item.status}`, 20, y + 7)
    pdf.setDrawColor(232, 233, 240)
    pdf.line(20, y + 12, 190, y + 12)
    y += 22
  })
  pdf.save('setlr-sample-statement.pdf')
}
