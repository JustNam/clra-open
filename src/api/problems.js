// The API service layer: no axios calls in components.
// All HTTP requests live here. Components call these methods.
import axios from 'axios'
import { problemAdapter } from '@/adapters/problem.adapter'

// TODO (student): implement list, getById, create, update, remove
