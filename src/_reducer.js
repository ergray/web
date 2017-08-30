const _ = require('lodash')

export const initialState = {
  bills: {},
  billSort: 'mostVotes',
  constituents: { approved: [], rejected: [], requests: [] },
  isVerified: false,
  knownNumbers: {},
  loading: {
    client: true,
  },
  sessionId: '',
  user: {},
  votes: {},
}

export default function reducer(state, action) {
  switch (action.type) {
  case 'ADD_KNOWN_NUMBER':
    return { ...state,
      knownNumbers: { ...state.knownNumbers,
        [action.phoneNumber]: new Date(),
      },
    }

  case 'CAPTURE_ID_PHOTO':
    return { ...state,
      registrationPhotoPath: action.path,
    }

  case 'LOADING':
    return { ...state, loading: { ...state.loading, ...action } }

  case 'LOGIN_USER':
    return { ...state,
      isVerified: action.isVerified,
      sessionId: action.sessionId,
      user: action.user,
    }

  case 'LOGOUT':
    return { ...initialState,
      knownNumbers: state.knownNumbers, // persist between logouts
    }

  case 'SET_IS_VERIFIED':
    return { ...state,
      isVerified: true,
    }

  case 'SET_PHONE_NUMBER':
    return { ...state,
      phoneNumber: action.phoneNumber,
    }

  case 'SET_POTUS_APPROVAL':
    return { ...state,
      potusApproval: action.approve,
    }

  case 'SET_USER':
    return { ...state,
      user: action.user,
    }

  case 'START_LOGIN_DEMO':
    return { ...state,
      sessionId: action.sessionId,
      user: action.user,
    }

  case 'START_REGISTRATION_DEMO':
    return { ...state,
      sessionId: '58cd63bc-056c-476f-b51f-20cf55c66c2f',
      user: {
        first_name: 'REG_DEMO',
        invite_code: 'REG_DEMO',
      },
    }

  case 'SYNC_BILLS': // eslint-disable-line no-case-declarations
    const bills = (state.bills.us || []).reduce((obj, bill) => Object.assign(obj, { [bill.bill_uid]: bill }), {})

    if (action.legislature === 'us') {
      action.bills.forEach((bill) => {
        bills[bill.bill_uid] = bill
      })
    }

    const newBills = _.orderBy(Object.values(bills), ['last_action_date', 'bill_uid'], ['desc', 'desc'])
    newBills.synced = action.synced

    return { ...state,
      bills: { ...state.bills,
        [action.legislature || action.date]: newBills,
      },
    }

  case 'SYNC_CONSTITUENTS':
    return { ...state,
      constituents: action.constituents,
    }

  case 'SYNC_DELEGATES':
    return { ...state,
      delegates: action.delegates,
    }

  case 'SYNC_NEXT_AGENDA':
    return { ...state,
      nextAgenda: action.nextAgenda,
    }

  case 'SYNC_VOTES':
    return { ...state,
      votes: { ...state.votes,
        [action.date]: action.votes,
      },
    }

  case 'SYNC_VOTING_POWER':
    return { ...state,
      votingPower: action.votingPower,
    }

  case 'TOGGLE_BILL_SORT':
    return { ...state,
      billSort: state.billSort === 'itemNumber' ? 'mostVotes' : 'itemNumber',
    }

  case 'TOGGLE_DELEGATES_EDIT_MODE':
    return { ...state,
      delegatesEditMode: !state.delegatesEditMode,
    }

  case 'TOGGLE_LEGISLATION_NOTIFICATIONS':
    return { ...state,
      user: { ...state.user,
        legislation_notification: !state.user.legislation_notification,
      },
    }

  case 'TOGGLE_VOTE_COUNTS_MODE':
    return { ...state,
      showDistrictVotes: !state.showDistrictVotes,
    }

  case 'UPDATE_BILL_VOTE_COUNTS': {
    const key = action.legislature || action.activeBill.slice(0, 10)
    return { ...state,
      bills: { ...state.bills,
        [key]: (state.bills[key] || []).map((bill) => {
          const newBill = { ...bill }
          // Modify just the bill we want
          if (bill.uid === action.activeBill) {
            newBill.votes = action.votes
          }
          return newBill
        }),
      },
    }
  }

  case 'UPDATE_DELEGATE_INFO':
    return { ...state,
      delegates: state.delegates.map((delegate, index) => {
        const updatedDelegate = { ...delegate }

        // Modify just the bill we want
        if (index === action.rowIndex) {
          if (action.name && (updatedDelegate.name !== action.name)) {
            updatedDelegate.nickname = updatedDelegate.name
            updatedDelegate.name = action.name
          }

          if (updatedDelegate.nickname === updatedDelegate.phone) {
            delete updatedDelegate.nickname
          }

          updatedDelegate.status = action.status
          updatedDelegate.user_id = action.user_id
        }
        return updatedDelegate
      }),
    }

  case 'UPDATE_SESSION_ID':
    return { ...state,
      sessionId: action.sessionId,
    }

  case 'UPDATE_SF_DISTRICT':
    return { ...state,
      user: { ...state.user,
        sf_district: action.sf_district,
      },
    }

  case 'VOTE_ON_BILL':
    return { ...state,
      votes: { ...state.votes,
        [action.bill.date]: { ...state.votes[action.bill.date],
          [action.bill.uid]: {
            position: action.position,
          },
        },
      },
    }

  default:
    return state
  }
}
