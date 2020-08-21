/**
 * 0 17 11 223344
 * 013 11223344
 * 014 11 223344
 * 015 11223344
 * 01611-223344
 * 8801711223344
 * +8801811223344
 * 008801911223344
 */
const pattern = /((\+?880|00880)|0)\s?(13|14|15|16|17|18|19)\s?\d{2}(\s|\W)?\d{6}$/;

module.exports = isBdNumber = phoneNumber => pattern.test(phoneNumber);

// module.exports = isBdNumber;
