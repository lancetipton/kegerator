import moment from 'moment'
import { Values } from 'KegConstants'

export const formatMoment = (date, type) => type === Values.SIMPLE_DATE_FORMAT
  ? moment(date).format(Values.SIMPLE_DATE_FORMAT)
  : moment(date).format(Values.CREATE_DATE_FORMAT)
