import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';

// add 10%
export function calculateGasMargin(value) {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}

export function getScanLink(data, type) {
  const prefix = 'https://ftmscan.com';
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/block/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export function truncate(number, index = 4) {
  // cutting the number
  if (number.toString().indexOf('.') > -1) {
    return +number
      .toString()
      .slice(0, number.toString().indexOf('.') + (index + 1));
  }
  return number;
}

export const toWei = (amount) => {
  return ethers.utils.parseUnits(amount, '18');
};
