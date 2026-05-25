// The API service layer: no axios calls in components.
// All HTTP requests live here. Components call these methods.
import axios from 'axios'
import { highlightAdapter } from '@/adapters/highlight.adapter'

// TODO (student): implement list, create, remove
