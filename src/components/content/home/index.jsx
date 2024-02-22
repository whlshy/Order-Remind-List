import React, { useState, useEffect } from 'react'
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useQuery } from '@tanstack/react-query'
import { getGoogleSheet } from '../../../apis/account'
import Loading from '../../elements/Loading'

export default function index() {
  const [click, setClick] = useState(0)
  const getGoogleSheetApi = useQuery({ queryKey: ["getGoogleSheet"], queryFn: () => getGoogleSheet() })
  const { data } = getGoogleSheetApi
  const list = JSON.parse(data?.values?.[0] || '[]')

  useEffect(() => {
    let id = setInterval(() => {
      setClick(click + 1);
    }, 1000);
    return function () {
      clearInterval(id);
    }
  }, [click])

  return (
    <Box sx={{ p: 2, backgroundColor: "#7B1513", color: "#fff", flex: "1 1 auto", maxWidth: "400px" }} className="flex flex-col">
      <Box className="flex jcc aic" sx={{ fontWeight: "bolder", fontSize: "40px" }}>
        已完成的訂單號碼
      </Box>
      <Box
        sx={{ backgroundColor: "#fff", borderRadius: "20px", color: "#000", mt: 2, fontWeight: "bolder", fontSize: "40px", mt: 2, boxSizing: "border-box" }}
        className="flex-1-1"
      >
        <Box sx={{ mt: 2, pl: 2, pr: 2 }}>
          <LoadingButton
            variant='outlined'
            fullWidth
            onClick={() => (click > 9 && (getGoogleSheetApi.refetch(), setClick(0)))}
            disabled={click < 10}
          >
            重新讀取
          </LoadingButton>
        </Box>
        {
          getGoogleSheetApi?.isFetching &&
          <Box sx={{ mt: 2 }} className="flex jcc">
            <Loading />
          </Box>
        }
        <Box>
          {
            Array.isArray(list) && list?.reverse()?.map(d =>
              <Typography
                variant='span'
                sx={{
                  m: 1, p: 1, borderRadius: "10px", flex: "0",
                  "&:hover": { backgroundColor: "#e9e9e9" }
                }}
                className="flex"
              >
                {d}
              </Typography>
            )
          }
        </Box>

      </Box>
    </Box>
  )
}
