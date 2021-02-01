const {
  mock,
  Random
} = require('mockjs2');

const List = [];
const count = 999;

const userMock = () => {
  return mock({
    id: '@uuid',
    avatar: '@image("100x100", "#000")',
    username: '@cname',
    nickname: '@cname',
    title: '@ctitle',
    intro: '@csentence',
    created_at: '@date',
    updated_at: '@date'
  })
}

for (let i = 0; i < count; i++) {
  List.push(userMock());
}

function fetchFromServer(startRow, count, filter, sortBy, descending) {
  const data = filter ?
    List.filter(row => row.username.includes(filter)) :
    List.slice()

  // handle sortBy
  if (sortBy) {
    const sortFn = sortBy === 'desc' ?
      (descending ?
        (a, b) => (a.username > b.username ? -1 : a.username < b.username ? 1 : 0) :
        (a, b) => (a.username > b.username ? 1 : a.username < b.username ? -1 : 0)
      ) :
      (descending ?
        (a, b) => (parseFloat(b[sortBy]) - parseFloat(a[sortBy])) :
        (a, b) => (parseFloat(a[sortBy]) - parseFloat(b[sortBy]))
      )
    data.sort(sortFn)
  }

  return data.slice(startRow, startRow + count)
}

module.exports = [{
    url: '/v1/users',
    type: 'get',
    response(config) {
      const filter = ""
      const {
        startRow,
        count,
        sortBy,
        descending
      } = config.query;

      const returnedData = fetchFromServer(startRow, count, filter, sortBy, descending)

      return {
        code: 200,
        message: 'success',
        result: {
          data: returnedData,
          total: List.length
        }
      };
    }
  },
  {
    url: '/v1/users',
    type: 'post',
    response(config) {
      const user = {
        ...userMock(),
        ...config.body
      }
      List.push(user);
      return {
        code: 200,
        message: 'success',
        result: user
      };
    }
  },
  {
    url: '/v1/users',
    type: 'delete',
    response(config) {
      const url = config.url.split('/');
      const id = url[url.length - 1]
      const index = List.findIndex(item => item.id === id)

      List.splice(index, 1)
      return {
        code: 200,
        message: 'success'
      };
    }
  },
  {
    url: '/v1/users',
    type: 'put',
    response(config) {
      const {
        id
      } = config.body

      List.filter(item => item.id === id)
      List.forEach(item => {
        if (item.id === id) {
          item = config.body
        }
      })
      return {
        code: 200,
        message: 'success',
      };
    }
  }
];
