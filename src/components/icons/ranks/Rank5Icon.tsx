import { HTMLAttributes } from 'react';

export const Rank5Icon = (props: HTMLAttributes<SVGElement>) => {
  return (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <rect width="37" height="37" rx="12" fill="url(#pattern05)" />
      <defs>
        <pattern
          id="pattern05"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_1021_682095" transform="scale(0.015625)" />
        </pattern>
        <image
          id="image0_1021_682095"
          width="64"
          height="64"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABR2lDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf87AziDNwMFgxsCSmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsgs53rrCet/pF5/emHSumPG5hMw1aMArpTU4mQg/QeI05ILikoYGBhTgGzl8pICELsDyBYpAjoKyJ4DYqdD2BtA7CQI+whYTUiQM5B9A8gWSM5IBJrB+ALI1klCEk9HYkPtBQEeH3eF0JySokQFDxcCziUdlKRWlIBo5/yCyqLM9IwSBUdgKKUqeOYl6+koGBkYGTMwgMIcovrzDXBYMopxIMSKDRgYrHqBggUIsVgRBoYtGQwMfMkIMbVJDAyC3AwMh6MKEosS4Q5g/MZSnGZsBGFzb2dgYJ32///ncAYGdk0Ghr/X////vf3//7/LGBiYbzEwHPgGAKV5YEOIaWjqAAAAOGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAACoAIABAAAAAEAAABAoAMABAAAAAEAAABAAAAAAGWZYIoAAA8mSURBVHgB7VppbFzXdT73LfNmIWc4HO7DRdxE7ZIj0YoWW4pl1TbqWEgcyYaLJkWLtkCbH/1RoGj9J0WKAgnQFoH/FG3TxA7cyonQJHLipI1dxVVsVZsty9q4U1xmOCSHM5x9ee/dfudJcpikrqmhQqEJn0S+mTvvLue73/nOuWdItHatIbCGwBoCawj8+iIg7rPpS+eX93kta9OvIfDriIB6P43e19tweGOd91hzqNo9Ec+O3o+1LBWh1Zqf55R7Opse9GribE9Qp6GFEuUt2n1mbObcai3izjzKnRereHfUXgj7r2p9OpWI7FCVi/j9Kq7hg6nuBwB0oKupX9flXlEu077+bkGlEmm2vffA+qb+D1a2Si9WGwDH5fKWeFaXum99nZ+e/uQ+sb6ljjxuxZe36dnbdq+aa642APLg5voqbPdTiijTY/3dtGip9PimdpISniHlU7t7av0AYdWSotUGgLJ59aihKD0eVaWahgZyr2uhUHOI3IpC3G7brqdXif3ONKsOgCLEcy5MvTNcT829zcSvGza0Un9bo/NaMcVzv7IA7O1ufEQX8kAZ4tff3UhGKESlTMa5MwC2bZPukgf3dTd9YrVAWFUGYLIjLhfp7UEftTUGSeo6uZprnXsz3CDsdxM+10jIp37lADi4oWmdJuURtxDUGfBQ48Y2KhsGCUM49yYIIbe7IIaaLT/9cF9j52qAsBoMcEIaWP8kQl0Hq/2O2irytraS3hQk0zRJa6zB+wannY32qWq7NOnJ2wD8UkPiagDghDSI3TNeTaMQdr2tG7tfbYD6knLJnMMC2+ul9p52asbnHo9KOomjtwH4pYZE7fYky77tbAm2C10LcQdL0Rag6tJDebKlWyi6rdq2FLapWJpLOuDWkFnUdOPhUknuL0DktgYC1LVrA1FVLXEeHIQecEZogw3c3nXuGp2NpxEWxUNHtrQ8k5V0Jlc0dU0VNhUwqfvWUvN5ZM8CmYOmmqplq6a0graUijCtuYuRxCSeWhZwywFA7OurqxKW9tvw39+sNsRuzBxiKuOeRwprmopXYePw37CFVMtSlu2yrdjY8bKq2mbBcvFqkzmL2tuggqz4Lvi6Bx2MABXTRScR0uAGrWDCDyYWKIC8oGjZx1WMpQpVESVTKpoCZtik4LOqasVC7mBj/qKpqC7bFl5ux7riNTXGhWKJTkrV/MZbA/OZ/wuM5QBANS6v5hb2Vw50BrSuGi9S9xIpbjdlMiVPIpvljaRiURKHt1TBprSULn4vkO1ZlkYZuwTjTeqoqqLe3ZtJRQ4g8ZnLxWMRuXAYshbzTnvfzj7qHJ+nmwiPtYgSAU3TVcOCYQb54DLsRuwiSKQ0AwIK1/Iwi6oQPmSxSJqmhSYWMo+dmsweSpva8Vt8+fDfyxaYRzY1vY6j66GtAY/cuL1btO7aRh6oNqOuIqvj3bYsy6G1qZhUzpYBiCAFIlfQbFqEgdXCoO4HN5InHHDEz+PxUC6XIy92vVAoOOPkZxdp9O0blLILFMD4BphzZw6eRwcozCbFrTiuw0xkIc0B4Ok3L9KNG6PycjInhmPW66dGooc/3PRbnyyLAfzoQq78xrlM6dDVmYxYN1+gz3lrKNSBFLaujmqbaiiAvVDrA46yq6rHoTQzgoVORb4PqhIDY4MhjJIBMPhzNwzhOw5HYIUkT0M9bX8uhD4ePK8AWNsZy63wUnU8myEzlgRjFimNHV+cTVJ+Lk5z03P0jZ9co5sLGZEBqxShnuJ1f9S1bAbwQLs66z8PoXmhCNR5Z575+Bba0dPEtKMQVL2moQaA+Enx+52wRobL2VkGgVNeK5knvTZIOuoADlvQpoI1FnZWMFsYDDBHzsep7K92jOd2BlQ1LSpNTJCdSlEBPwszGYpDO/j5qzej9C/nrxPrEK9LVdQ/OT8a+wqv+aOuuwKAB3ugq26XIsV5pl4Zk31yQxc91NGMRVq3fdMDgXc57mGClhpAyYP+PmR+fPiRbQCg1kcWSkCsI6wTErtvmjmH3mYiRzIap0XsaGZmgbzQHBO7zCCzu6RhdBaMKTCTsNOnYfzJ6yMOwOwali32Xbo5+/ZHGX7n87sGgDtuD9etVzQ5wCCwAB7sDNMnENt5V50dABhMbQGau+GfQd2mmnADefZuI/fOdaTkFEdIDbAmlbLJ71eIwVIhbsyGwsVBKv73FUpMxShRVqAhGkAq3hJaGCkhsEVowVsjk3RqdOqnxitiw+Wx+YE7xi3nvmwNWDrYe9Pzg9s6GrtIk5fdtl11GtSMwYBd4bBDaX6W6eyF+rfWcPKjk6+9iYwNYQJtbgFVXe0Yq9lx3OHzHtYHBHrdIu/GVlLBgFR0nhayRZqey1OO9QAUZ8QZpAvTozQ4H0G+APYoSsYS8oGrI3PDS9e5nNcVZ4KXb8bGimW7TxHKmSrswTgW89boKOWxOA68HN68Xs0xKu/RyHiglwR2nJMeDe1GtZ9yk1P05pdfce5uf8BhAGsCP2ds7qWcG0VrDIQo6YzH4sZA8Dw8H0cVRIiziq1srcR4BqhiALjzwOR8pJQTh7Gpp1wAYSqZpNHZKSdWhxCj4/E4DUYiUOpZUlvrqZzIIuijAFodpOSNEYq+8E0q4hm+pwYGnHaBVJif03saKRmL0cDcNM1D9OqYUXAFNpzn4fmAx0+gRI9dGp8Z5/VUcq34e4FYNlvuDvlfs3W5X9NEWzyZQxpYEDMIU/H0LO3Qi/To3zxPSA2deK6FGqk4NEnz//QKQlaepkxkd1B4/cY4ebsQUZqbiPI5skoZWte/k6LfeY3OLixSBKBMZxZpOJaQGoRGaMo5YdGnzo8BwRVcKwaA50bmlWuu9n1fsegRhLyWCA44hOPc4SpJT3zpT51MT7gN0hsbKfMuBO7Ev9MQwtjVNA5DpqQkQHBLi2pmpkn6fWR0d5CdLWCIIrU8uIOyp87QmcUyjS5kSOUKelm8K23x5Nmx2dgKbHe63hMAMJKA0ZnWoM8wbfEEWE6PN+p04FMHqaV/C6iK/L+lkQrvD1L51R/R8EyKri0grsPfyxA2XkSamWCVKDgeIYlcQutoBQhZ8lZ70dsiG+1DJQvhUoHfii+dHZ97g+d1rFjBrxVpwM/PW5bUDL+knXVu6oDZmz7zFEpeJfJ0hal0dYIK336TJheyNILkxUmXEdJY2TllLiMfGEBuMAmj8//2Yypfm0TpqA1JT4E2Hz1C7XAlHpfHLyuy5efnrvT9vWKAM3+9v/qLDS61bb9f2k//5eed3XFv6qbiyBRljv8AIS1DV5Kmo+h5WJKF8RpAKGEVSKSdHGIRxwm/ipxg6CYORw2k9rZTcSqKQ9Q25Prn7MmsENmSUGOp7FcrNXppv3vGgD2trR5p2aFd9Srt6qonNYAfKH8pukCZr30XCU2ZrqTkrSQGiQzscHIGTpE59HF6zSdIzhD5OX6e+xH6Gy0h0mpqUEhtIB7fsu3QtsZG31JDKn19zwDIq4VHWj3q+l6Ev22ffZoP6sRpbeIfTlDGIBpn49jnOY3FzuswmL8LsDhrxF2Bb3M7n+z4wHQTrpNGtrf41ePOGYIPRts/9xllcxVRW0DtUdz2gUqNXtrvngGAYtDv9QVUOvzx9aA4vuvDji2+9D1np8exo1z0YOM5UeJjLV+XZmbo6zjE8N05NaKdDeX+zIZx9MlIFyVffNU5YBVx+juwp4+2oFzkspU/WGpIpa/viQbs7KrfH/LQl5/rC9L6x/fDd8OUOvFDyhbLNIXCVD6ThxjmwQDVOUBNIK5/HwcY+DEZSG5i6RzdmI1TyOOigAuVYaxKQ97A4aEgNHLryCHeGyXjY6glaABwJkpX45kN/oDvjWgiN1Gp8dzvngAQrvH94cMtvoeOHdpCVhNE6/wgJTNJipowAIpvoYBXBauGsKNvDk/QOYQ0ZgGf3nDFcAexia7Hk5Qs5ijo1qkN+YCFsGjjmTw+U1BC0yNpkuEmajNMGo8kaDhZikWTOQ6HFV8rBuBQOByq9dp/91ubamtb9/VTMZqkhdg0TaH+x76sgs55/JwcmKMfDU6iZHarCAI5mIb5z5dt8881oQyBKDtAgOoFAPY+sr1koSw6Ay7yQyss7FNOwq3KeegFkmCU1IzIDF2O58LBUODl6fk0Y1TRtWIAWkOu3+jvCP7RsYObqaC4aXpmlGLYKa4C+SGEpwZjdOJKhK4n09KlqoJVv2jKL6AM8jvvTST+azZVTEQX8+fCjcGXUEjNI8s9KBVFjKWy8kY8LdBGWyH4NjLGhXwGopkjj6uKOpETDE8vBKfn0m9PJPN3dQReitSKAdjeVvvFI+1Vm7vWd8mRVFzERmapSq0ClYv04vlx+s9IAmcDW+gwCoeBb5JiPfHO+MLJ2cUiF7nZBxwhjsbTOdD5x/VB19dRX2/RhdhSgPHX42k5kigILsYGdR/NJxJkGxoF/TXSis6IaylTHZxNf2upUXfz2nHCu+mw9Nmj21vDTYZy+QtHH6iNouI7/f4YVRvVdPLSBJ1GaXsRMZ0rt/g3iiL5sXdG5i/e7s/zgvW/cH3QvrOn7mPCUr6FzKGLI4Ifp8E96+ro0/gmOa2nqRWVqBZkjc+fuDSXKFo7jr87GfmF0ZbRsKIwiC8ttu7d0FCb8Bty7OIYDu0ueuH0kPzutRn80ZNTFYIM0rELY7PdS4znZf1vxv9M+8Xh+Xe4H877z6K6ZHKO8NrVKL1wdkgqOTeNXh4lnvdAX319Gl7CnSu5VgRArabt3lJnUGQcJ9KSS2JxdGkyIbgQoijq12Rw1ntxbK5ierJB50dir/A4KLy8xOO+N5UUf3t+hETWkJHBOG1udlGtou6txHjusyIN+OyO8J+1e5Teb5+bFi9ejor5bLnk9aqvoWp35MLY3D9Ho/ga5x5cPE4kmf1OW633X3WX3p1KFNtP34xrpVxarK/24VRJhf8Ynn25kqkq1oDf3ddX3ekTU68Pxf3xoszjCPy6oqp/cWEkdqWShdxNn13djVtsy/prHI0frdFsz6O9oeRAyup4+exw6m7G4WcrBuCJnh4jb6f+HpVhM0vqP1746R853hnzw/z8bte49PmfGXtPZ+hBTXX9vmpbWnVB++NXIxFUYlbxenZLS9tjm/34mvf+XYc2hEO8jvu3grWZ1xBYQ2ANgTUE1hBYQ2ANgTUE/n8i8D/kP9WADoH8EQAAAABJRU5ErkJggg=="
        />
      </defs>
    </svg>
  );
};