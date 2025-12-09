import {
    parseAsStringLiteral,
    createParser,
  } from 'nuqs'

  import { SortingState } from '@tanstack/react-table'


export const parseAsSort = createParser({
    parse(query) {
      const items = query.split(',')
      return items.map((item) => {
        const [key = '', direction = ''] = item.split(':')
        const desc = parseAsStringLiteral(['asc', 'desc']).parse(direction) ?? 'asc'
        return {
          id: key,
          desc: desc === 'desc'
        }
      })
    },
    serialize(value: SortingState) {
      return value.map((item) => `${item.id}:${item.desc ? 'desc' : 'asc'}`).join(',')
    },
    eq(a: SortingState, b: SortingState) {
      return a.length === b.length && a.every((item, index) => item.id === b[index].id && item.desc === b[index].desc)
    }
  })
