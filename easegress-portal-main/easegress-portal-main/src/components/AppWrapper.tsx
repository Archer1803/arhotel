'use client'

import React from 'react'
import { IntlProvider } from 'react-intl'
import { translations } from '@/locale'
import { SnackbarProvider } from 'notistack'
import { ClusterContext } from '@/app/context'
import {
  defaultCluster,
  defaultEgctlConfig,
  getCurrentClusterName,
  parseEgctlConfig,
  validateEgctlConfig,
} from '@/apis/cluster'
import { loadYaml } from '@/common/utils'
import { MaterialDesignContent } from 'notistack'
import { styled } from '@mui/material/styles'

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-error': {
    backgroundColor: '#fdeded',
    color: '#5f2120',
  },
}))

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [clusters, setClusters] = React.useState([defaultCluster])
  const [currentClusterName, setCurrentClusterName] = React.useState(defaultCluster.name)

  React.useEffect(() => {
    const defaultConfig = parseEgctlConfig(loadYaml(defaultEgctlConfig).result)
    const rcFile = localStorage.getItem('easegress-rc-file') || defaultEgctlConfig
    const { result, err } = loadYaml(rcFile)

    if (err || validateEgctlConfig(result) !== '') {
      localStorage.setItem('easegress-rc-file', defaultEgctlConfig)
      setClusters(defaultConfig.clusters)
      setCurrentClusterName(getCurrentClusterName(defaultConfig) || defaultCluster.name)
      return
    }

    const config = parseEgctlConfig(result)
    setClusters(config.clusters)
    setCurrentClusterName(getCurrentClusterName(config) || config.clusters[0].name)
  }, [])

  const clusterContext = {
    clusters,
    setClusters,
    currentClusterName,
    setCurrentClusterName,
  }

  return (
    <IntlProvider locale="en-US" messages={translations['en-US']}>
      <SnackbarProvider
        Components={{ error: StyledMaterialDesignContent }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        maxSnack={3}
        autoHideDuration={5000}
      >
        <ClusterContext.Provider value={clusterContext}>
          {children}
        </ClusterContext.Provider>
      </SnackbarProvider>
    </IntlProvider>
  )
}
