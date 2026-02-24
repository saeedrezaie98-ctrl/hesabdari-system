// utils/dateUtils.js

/**
 * Converts a Gregorian date to a Jalali (Persian) date.
 * @param {Date} gregorianDate - The Gregorian date to convert.
 * @returns {string} The Jalali date in YYYY/MM/DD format.
 */
function convertGregorianToJalali(gregorianDate) {
    const gYear = gregorianDate.getFullYear();
    const gMonth = gregorianDate.getMonth() + 1;
    const gDay = gregorianDate.getDate();

    const gDaysInMonth = [31, (isLeap(gYear) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    let gy = gYear - 1600;
    let gm = gMonth - 1;
    let gd = gDay - 1;

    let gDayNo = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);

    for (let i = 0; i < gm; ++i) gDayNo += gDaysInMonth[i];
    gDayNo += gd;

    let jDayNo = gDayNo - 79;

    let jNp = Math.floor(jDayNo / 12053);
    jDayNo %= 12053;

    let jy = 979 + 33 * jNp + 4 * Math.floor(jDayNo / 1461);
    jDayNo %= 1461;

    if (jDayNo >= 366) {
        jy += Math.floor((jDayNo - 366) / 365);
        jDayNo = (jDayNo - 366) % 365;
    }

    let jm = 0;
    for (; jm < 11 && jDayNo >= jDaysInMonth[jm]; ++jm) {
        jDayNo -= jDaysInMonth[jm];
    }

    let jd = jDayNo + 1;

    return `${jy}/${String(jm + 1).padStart(2, '0')}/${String(jd).padStart(2, '0')}`;
}

function isLeap(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Formats a number as currency in Tomans.
 * @param {number} amount - The amount in Rials.
 * @returns {string} Formatted currency string in Tomans.
 */
function formatCurrencyInTomans(amount) {
    const tomans = Math.floor(amount / 10); // Convert Rial → Toman
    return `${tomans.toLocaleString('fa-IR')} تومان`;
}

module.exports = { convertGregorianToJalali, formatCurrencyInTomans };