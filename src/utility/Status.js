export const STATUS = {
  "00": "PENDING SUBMISSION",
  "01": "AWAITING HOD APPROVAL",
  "010": "HOD DECLINED",
  "011": "HOD APPROVED",
  "012": "AWAITING CLOSE OUT",
  "013": "CLOSED OUT",
  RFQ01: "Awaiting Vendor Response",
  RFQ02: "Vendor Responded",
  RFQ03: "Procurement Approved",
  RFQ04: "Procurement Disapproved, With Reason",
  PO00: "PO Saved",
  POX0: "Awaiting Review",
  POX1: "Line Manager Decline Approval With Reason",
  PO01: "Awaiting First Approval",
  POX2: "HOD Declined Approval With Reason",
  PO02: "Awaiting Final Approval",
  PO03: "CEO Approved",
  PO04: "PO Closed",
  POX3: "CEO Declined Approval With Reason",
  X: "Request Cancelled",
};

export function getStatus(status) {
  return STATUS[status];
}
