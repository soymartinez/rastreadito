import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const Icons = {
  beehigh: (props: IconProps) => (
    <svg
      viewBox='0 0 48 40'
      fill='none'
      {...props}
    >
      <g clipPath='url(#clip0_620_108)'>
        <mask
          id='mask0_620_108'
          style={{
            maskType: 'luminance',
          }}
          maskUnits='userSpaceOnUse'
          x={0}
          y={3}
          width={48}
          height={37}
        >
          <path
            d='M0.132935 3.02478H47.5319V39.4989H0.132935V3.02478Z'
            fill='white'
          />
        </mask>
        <g mask='url(#mask0_620_108)'>
          <path
            d='M38.8085 20.8281C35.109 20.8281 32.0797 18.903 30.0345 17.0728C29.8909 16.8803 29.742 16.6931 29.5824 16.5138C29.2579 16.1577 28.9016 15.8386 28.5159 15.5591C28.2393 15.2532 28.0026 14.9737 27.8085 14.7311C29.3537 13.8344 32.6489 12.2179 36.3111 12.2179C40.3803 12.2179 43.7872 14.2063 46.4441 18.1356C43.8936 19.9236 41.3271 20.8281 38.8085 20.8281ZM34.9946 25.2664C32.718 23.7896 31.7712 21.2685 31.3803 19.4515C33.3643 20.7833 35.8563 21.8592 38.7393 21.8777C39.5585 23.1303 39.9946 24.6809 40.0399 26.5138C38.0452 26.5612 36.3457 26.1419 34.9946 25.2664ZM23.8909 35.4378C21.8191 35.4088 20.2074 33.8845 19.0824 31.6904H28.6994C27.5771 33.8845 25.9654 35.4088 23.8909 35.4378ZM13.0053 25.2664C11.6542 26.1419 9.95474 26.5612 7.96006 26.5138C8.00528 24.6809 8.44145 23.1303 9.26059 21.8777C12.0957 21.8592 14.5505 20.8176 16.5186 19.5174C16.3617 20.0106 16.2393 20.5301 16.1516 21.0813C15.6037 22.5818 14.6542 24.1957 13.0053 25.2664ZM11.6888 12.2179C15.351 12.2179 18.6462 13.8344 20.1914 14.7311C20.0744 14.8787 19.9361 15.0422 19.7872 15.2163C19.1994 15.5697 18.6648 16.0021 18.2021 16.5138C17.9175 16.8276 17.6649 17.1678 17.4335 17.529C15.4095 19.2089 12.5824 20.8281 9.19145 20.8281C6.67283 20.8281 4.10634 19.9236 1.55581 18.1356C4.21272 14.2063 7.61964 12.2179 11.6888 12.2179ZM23.8909 4.22736C26.6409 4.22736 28.8776 6.44255 28.8776 9.16934C28.8776 11.8935 26.6409 14.1113 23.8909 14.1113C21.1436 14.1113 18.9069 11.8935 18.9069 9.16934C18.9069 6.44255 21.1436 4.22736 23.8909 4.22736ZM17.6781 19.8972C17.9228 19.1219 18.2579 18.4309 18.6835 17.8402C19.226 17.355 19.7021 16.8777 20.1063 16.4399C21.1595 15.7147 22.4601 15.3218 23.8909 15.3112C25.8218 15.3244 27.5212 16.0364 28.6808 17.3154C29.3111 18.0116 29.7872 18.8819 30.1063 19.8972H17.6781ZM17.5133 26.7933H30.2686C30.0399 28.0881 29.6968 29.3487 29.242 30.4932H18.5425C18.0877 29.3487 17.742 28.0881 17.5133 26.7933ZM30.4813 25.3112C30.4707 25.4062 30.4601 25.5011 30.4494 25.596H17.3351C17.3244 25.5011 17.3111 25.4062 17.3031 25.3112C17.1329 23.75 17.1622 22.3365 17.3829 21.0971H30.4016C30.6223 22.3365 30.6516 23.75 30.4813 25.3112ZM47.867 18.3967L47.843 18.3571C44.4282 12.8007 40.1542 11.1683 36.3111 11.1683C33.2819 11.1683 30.5212 12.1809 28.6595 13.0881C29.5505 12.0227 30.0877 10.6567 30.0877 9.16934C30.0877 5.78327 27.3085 3.02747 23.8909 3.02747C20.476 3.02747 17.6968 5.78327 17.6968 9.16934C17.6968 10.5802 18.1808 11.883 18.992 12.922C17.1436 12.0623 14.5345 11.1683 11.6888 11.1683C7.8457 11.1683 3.57177 12.8007 0.156871 18.3571L0.132935 18.3967L0.170169 18.423C3.01591 20.6092 5.67815 21.6008 8.09304 21.8249C7.27123 23.3123 6.88294 25.1161 6.94145 27.2311L6.94942 27.4684L7.18879 27.4895C9.71804 27.6794 11.8643 27.2152 13.5638 26.1129C14.5984 25.4431 15.3856 24.5939 15.9867 23.6841C15.9973 24.2485 16.0319 24.8313 16.0984 25.4378C16.7526 31.4584 19.242 35.5881 22.5984 36.461C22.7021 37.1308 23.0133 38.46 23.8909 39.5122C23.8909 39.5122 24.9441 38.1857 25.2234 36.4531C28.5585 35.5591 31.0319 31.4373 31.6861 25.4378C31.7633 24.7126 31.8032 24.0164 31.8058 23.3518C32.4282 24.3856 33.2792 25.364 34.4361 26.1129C36.1356 27.2152 38.2819 27.6794 40.8111 27.4895L41.0505 27.4684L41.0585 27.2311C41.117 25.1161 40.7287 23.3123 39.9069 21.8249C42.3218 21.6008 44.984 20.6092 47.8297 18.423L47.867 18.3967Z'
            fill='currentColor'
          />
        </g>
        <mask
          id='mask1_620_108'
          style={{
            maskType: 'luminance',
          }}
          maskUnits='userSpaceOnUse'
          x={19}
          y={0}
          width={3}
          height={3}
        >
          <path
            d='M19.7446 0.237305H21.7872V2.70039H19.7446V0.237305Z'
            fill='currentColor'
          />
        </mask>
        <g mask='url(#mask1_620_108)'>
          <path
            d='M20.8165 2.0622C21.3165 2.0622 21.7234 1.65871 21.7234 1.16293C21.7234 0.667153 21.3165 0.263672 20.8165 0.263672C20.3165 0.263672 19.9095 0.667153 19.9095 1.16293C19.9095 1.65871 20.3165 2.0622 20.8165 2.0622Z'
            fill='currentColor'
          />
        </g>
        <mask
          id='mask2_620_108'
          style={{
            maskType: 'luminance',
          }}
          maskUnits='userSpaceOnUse'
          x={25}
          y={0}
          width={3}
          height={3}
        >
          <path
            d='M25.8723 0.237305H27.9149V2.70039H25.8723V0.237305Z'
            fill='currentColor'
          />
        </mask>
        <g mask='url(#mask2_620_108)'>
          <path
            d='M26.8325 2.03851C27.3325 2.03851 27.7367 1.63503 27.7367 1.13925C27.7367 0.643471 27.3325 0.23999 26.8325 0.23999C26.3325 0.23999 25.9255 0.643471 25.9255 1.13925C25.9255 1.63503 26.3325 2.03851 26.8325 2.03851Z'
            fill='currentColor'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_620_108'>
          <rect width={48} height={40} fill='currentColor' />
        </clipPath>
      </defs>
    </svg>
  ),
  grasslands: (props: IconProps) => (
    <svg
      viewBox='0 0 156 40'
      fill='none'
      {...props}
    >
      <g clipPath='url(#clip0_619_288)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M11.7293 4.35588C13.3861 1.42941 15.8082 0 17.8374 0C29.4435 0 23.0716 17.6765 9.89662 17.6765C9.19309 17.6738 8.49092 17.6138 7.79707 17.4971L6.76489 19.3176C4.55684 23.1029 5.02015 25.6382 7.54782 25.6382C10.4303 25.6382 12.6735 23.1765 14.6323 19.7118L15.0253 19.0676H18.7259L14.0341 27.1382C16.9518 25.8912 19.5528 23.6088 22.6141 20.0794L22.8634 19.7853C23.4432 20.0654 23.9262 20.513 24.2504 21.0706C20.192 25.7765 16.4181 28.4235 12.5738 29.6412L9.72654 34.5353C7.03759 39.1176 1.60105 38.3529 1.60105 34.7824C1.60105 31.9971 4.70053 29.9618 9.72068 28.4265L10.6795 26.7471C9.48105 27.5252 8.08408 27.9399 6.65639 27.9412C1.42511 27.9412 0.961805 22.9412 3.55985 18.4265L4.66534 16.4971C1.67436 14.9265 0 12.0588 0 9.11765C0 6.61765 1.17293 4.08235 3.81203 2.19118L5.02308 4.36765C3.54583 5.46521 2.66412 7.19153 2.6391 9.03529C2.66417 11.2843 3.94413 13.3293 5.95263 14.3294L11.7293 4.35588ZM6.6212 33.9235L8.29556 30.9235C5.44827 32.0324 4.59203 33.1382 4.59203 34.1029C4.59203 35.0676 5.83827 35.3176 6.6212 33.9235ZM17.8374 3.21471C23.7108 3.21471 19.5733 15.2118 9.89662 15.2118H9.14887L14.4916 5.92647C15.5941 4.03529 16.8052 3.21471 17.8374 3.21471Z'
          fill='currentColor'
        />
        <path
          d='M31.0827 15.8206C31.4651 15.1434 31.3792 14.2978 30.8687 13.7118L30.3702 13.1059C27.4144 17.1412 26.0274 18.9883 24.2475 21.0677C23.7161 20.7253 23.2503 20.2899 22.8722 19.7824C25.2796 16.9265 27.4847 13.7853 29.1239 11.4706L28.8043 11.0442C27.4847 9.32947 27.6636 7.22064 29.7632 5.32947L31.6868 7.43535C30.939 8.15006 30.939 8.90594 31.4727 9.57947L33.5254 12.0795C34.7364 13.5501 35.3434 14.8648 34.062 17.1148L30.3702 23.603C29.5139 25.0736 29.9772 25.6383 30.7983 25.6383C32.4345 25.6383 35.0326 23.1765 37.7039 20.0677L37.9532 19.7736C38.5341 20.0532 39.0182 20.5008 39.3431 21.0589C36.2788 24.6412 32.7541 27.9412 29.6928 27.9412C26.7018 27.9412 25.5875 25.4059 27.1651 22.6471L31.0827 15.8206Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M56.8227 21.0677C56.4986 20.5101 56.0154 20.0625 55.4357 19.7824L55.1864 20.0736C52.5151 23.1824 49.917 25.6442 48.2778 25.6442C47.4597 25.6442 46.9964 25.0795 47.8497 23.6089L53.8317 13.1118H51.7321C51.8729 11.5412 50.2718 9.36182 47.8497 9.36182C45.8587 9.36182 43.0818 10.9324 41.513 13.6471L36.3169 22.6471C34.7393 25.4059 35.8536 27.9412 38.8445 27.9412C40.34 27.9412 42.1903 26.9824 43.9703 25.5118C44.1491 26.9412 45.2869 27.9412 47.1753 27.9412C50.2366 27.9412 53.7613 24.6412 56.8227 21.0677ZM39.9471 25.6412C39.129 25.6412 38.6657 25.0765 39.519 23.6059L44.6828 14.5736C46.6768 11.1089 50.6296 12.0001 48.8115 15.3589L45.9291 20.4295C43.6858 23.9648 41.4778 25.6412 39.9471 25.6412Z'
          fill='currentColor'
        />
        <path
          d='M53.8318 24.9265L56.1483 23.7118C56.1483 23.7118 56.6468 25.0677 57.9077 25.0677C61.4265 25.0677 60.6465 18.1412 62.1068 14.2853C60.7902 16.0324 58.9399 18.6412 56.8286 21.0677C56.2935 20.7256 55.8237 20.2903 55.4416 19.7824C58.7874 15.8559 62.1332 11 63.6522 8.90002L66.4291 10.4C64.1507 15.15 64.3999 20.5765 63.227 24.1118C64.879 22.9673 66.3745 21.6107 67.6753 20.0765L67.9246 19.7824C68.5471 19.9963 69.0515 20.4627 69.3145 21.0677C66.5376 24.3177 62.7989 27.3177 59.0249 27.8324C58.9898 27.8324 58.9546 27.8677 58.9194 27.8677C58.5769 27.9096 58.2323 27.9342 57.8872 27.9412C55.9991 28.011 54.3144 26.7589 53.8318 24.9265Z'
          fill='currentColor'
        />
        <path
          d='M66.3293 24.9265L68.643 23.7118C68.643 23.7118 69.1414 25.0677 70.3877 25.0677C73.9065 25.0677 73.1294 18.1412 74.5897 14.2853C73.2731 16.0324 71.4199 18.6412 69.3115 21.0677C68.7767 20.7256 68.3069 20.2903 67.9245 19.7824C71.2703 15.8559 74.6161 11 76.1351 8.90002L78.912 10.4C76.6336 15.15 76.8828 20.5765 75.7099 24.1118C77.3614 22.9665 78.8568 21.61 80.1582 20.0765L80.4075 19.7824C81.0356 19.9928 81.5458 20.4596 81.8121 21.0677C79.0351 24.3177 75.2964 27.3177 71.5225 27.8324C71.4873 27.8324 71.4521 27.8677 71.414 27.8677C71.0695 27.91 70.7232 27.9346 70.376 27.9412C68.4908 28.0079 66.8105 26.7562 66.3293 24.9265Z'
          fill='currentColor'
        />
        <path
          d='M89.5798 19.7823C90.1595 20.0624 90.6427 20.51 90.9668 21.0676C87.9054 24.6411 84.3807 27.9411 81.3194 27.9411C78.3284 27.9411 77.2141 25.4058 78.7917 22.647L90.7527 1.85583H94.4562L81.9968 23.6029C81.1405 25.0735 81.6038 25.6382 82.4219 25.6382C84.0611 25.6382 86.6592 23.1764 89.3305 20.0676L89.5798 19.7823Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M108.449 21.0677C108.124 20.5096 107.64 20.062 107.059 19.7824L106.81 20.0736C104.142 23.1824 101.541 25.6442 99.9046 25.6442C99.0864 25.6442 98.6231 25.0795 99.4764 23.6089L105.458 13.1118H103.356C103.5 11.5412 101.899 9.36182 99.4764 9.36182C97.4825 9.36182 94.7055 10.9324 93.1397 13.6471L87.9407 22.6471C86.3631 25.4059 87.4773 27.9412 90.4683 27.9412C91.9638 27.9412 93.817 26.9824 95.597 25.5118C95.7729 26.9412 96.9136 27.9412 98.7991 27.9412C101.863 27.9412 105.388 24.6412 108.449 21.0677ZM91.5738 25.6412C90.7528 25.6412 90.2924 25.0765 91.1457 23.6059L96.3066 14.5736C98.3006 11.1089 102.253 12.0001 100.438 15.3589L97.5528 20.4295C95.3125 23.9648 93.1045 25.6412 91.5738 25.6412Z'
          fill='currentColor'
        />
        <path
          d='M124.542 19.7823C125.122 20.0624 125.605 20.51 125.929 21.0676C122.865 24.6412 119.346 27.9412 116.282 27.9412C113.291 27.9412 112.176 25.4059 113.754 22.647L118.56 14.2529C120.161 11.5029 117.633 10.5764 111.974 17.6823L106.312 27.5676H102.576L112.863 9.70586H116.566L115.179 12.1353C117.029 10.2059 118.698 9.34998 120.305 9.34998C122.357 9.34998 123.9 11.3853 122.299 14.2059L116.959 23.6029C116.103 25.0735 116.566 25.6382 117.384 25.6382C119.023 25.6382 121.621 23.1764 124.293 20.0676L124.542 19.7823Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M143.412 21.0676C143.087 20.5095 142.602 20.0619 142.022 19.7823L141.775 20.0676C139.104 23.1764 136.506 25.6382 134.867 25.6382C134.049 25.6382 133.585 25.0735 134.439 23.6029L146.971 1.85583H143.268L137.82 11.2852C137.097 10.1039 135.82 9.37751 134.439 9.36172C132.445 9.36172 129.668 10.9323 128.102 13.647L122.906 22.647C121.328 25.4058 122.442 27.9411 125.433 27.9411C126.929 27.9411 128.779 26.9823 130.559 25.5117C130.738 26.9411 131.876 27.9411 133.764 27.9411C136.826 27.9411 140.35 24.6411 143.412 21.0676ZM126.536 25.6411C125.718 25.6411 125.255 25.0764 126.108 23.6058L131.272 14.5735C133.266 11.1088 137.216 12 135.4 15.3588H135.436L132.623 20.2147C130.38 23.8941 128.102 25.6411 126.536 25.6411Z'
          fill='currentColor'
        />
        <path
          d='M140.421 24.9265L142.737 23.7118C142.737 23.7118 143.236 25.0677 144.479 25.0677C147.998 25.0677 147.221 18.1412 148.681 14.2853C147.364 16.0324 145.514 18.6412 143.403 21.0677C142.868 20.7256 142.398 20.2903 142.016 19.7824C145.362 15.8559 148.707 11 150.226 8.90002L153.003 10.4C150.725 15.15 150.974 20.5765 149.801 24.1118C151.461 22.966 152.964 21.6063 154.27 20.0677L154.519 19.7736C155.142 19.9875 155.646 20.4538 155.909 21.0588C153.132 24.3088 149.393 27.3088 145.62 27.8236C145.584 27.8236 145.549 27.8588 145.514 27.8588C145.17 27.9009 144.825 27.9254 144.479 27.9324C142.592 28.0057 140.906 26.7571 140.421 24.9265Z'
          fill='currentColor'
        />
        <path
          d='M40.9412 39.1676C40.3598 38.5923 40.1838 37.7209 40.497 36.9641C40.8102 36.2073 41.5494 35.7168 42.3664 35.7235C42.9044 35.7135 43.427 35.9041 43.8325 36.2588L43.2988 36.847C43.0326 36.6341 42.7009 36.5209 42.3605 36.5265C42.0391 36.5094 41.7257 36.6297 41.4972 36.857C41.2688 37.0844 41.1468 37.3982 41.1612 37.7206C41.1471 38.0482 41.2679 38.3673 41.4955 38.6029C41.73 38.8309 42.0491 38.9503 42.3752 38.9323C42.6095 38.9473 42.8426 38.8876 43.0408 38.7618V38.0735H42.5188V37.3235H43.8531V39.2C43.4487 39.557 42.9256 39.7491 42.3869 39.7382C41.847 39.7573 41.3233 39.5509 40.9412 39.1676Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M49.1547 39.7559L48.1548 37.9912C48.6424 37.8559 48.9611 37.387 48.9084 36.8823C48.9084 36.1088 48.4421 35.7235 47.5038 35.7235H45.7444V39.7559H46.5449V38.0912H47.278L48.2369 39.7559H49.1547ZM47.668 37.3323H46.5449V36.4765H47.6739C47.9935 36.4882 48.1724 36.6029 48.1636 36.8912C48.1548 37.1794 47.9905 37.3323 47.668 37.3323Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M50.7622 36.5653C50.2223 37.3877 50.339 38.4786 51.0402 39.1677C51.4149 39.5548 51.9333 39.7677 52.4711 39.7559C53.4529 39.7586 54.2992 39.0636 54.49 38.0977C54.6812 37.1318 54.1637 36.1656 53.2552 35.7921C52.3468 35.4186 51.3017 35.7427 50.7622 36.5653ZM53.3508 38.6324C53.1248 38.8765 52.8031 39.0089 52.4711 38.9942C52.1462 39.003 51.8334 38.8712 51.612 38.6324C51.166 38.1168 51.166 37.3509 51.612 36.8353C51.8424 36.6039 52.1553 36.4739 52.4814 36.4739C52.8075 36.4739 53.1204 36.6039 53.3508 36.8353C53.7971 37.3509 53.7971 38.1168 53.3508 38.6324Z'
          fill='currentColor'
        />
        <path
          d='M58.6056 36.7971L57.8021 39.7383H57.0016L55.9283 35.7147H56.7846L57.4825 38.45L58.2038 35.7147H59.0308L59.7257 38.45L60.4236 35.7147H61.2857L60.2183 39.7383H59.4149L58.6056 36.7971Z'
          fill='currentColor'
        />
        <path
          d='M62.9659 39.747V35.7235H63.2328L65.7458 38.2441V35.7235H66.5639V39.747H66.2707L63.787 37.2529V39.747H62.9659Z'
          fill='currentColor'
        />
        <path
          d='M71.4404 35.7206H72.241V39.7471H71.4404V35.7206Z'
          fill='currentColor'
        />
        <path
          d='M74.1411 39.747V35.7235H74.408L76.921 38.2441V35.7235H77.7215V39.747H77.4283L74.9416 37.2529V39.747H74.1411Z'
          fill='currentColor'
        />
        <path
          d='M82.985 39.1677C82.4032 38.5924 82.2276 37.7209 82.5408 36.9642C82.8539 36.2074 83.5932 35.7168 84.4101 35.7236C84.9479 35.7145 85.4702 35.905 85.8763 36.2589L85.3397 36.8471C85.0734 36.6342 84.7418 36.5209 84.4013 36.5265C84.0802 36.5115 83.768 36.6321 83.5398 36.8592C83.312 37.0862 83.1894 37.3986 83.202 37.7206C83.1906 38.048 83.3111 38.3659 83.5363 38.603C83.7709 38.8309 84.0899 38.9503 84.416 38.9324C84.7544 38.94 85.0846 38.8274 85.3485 38.6148L85.8851 39.203C85.4801 39.5595 84.9573 39.7512 84.4189 39.7412C83.8826 39.7565 83.3639 39.5489 82.985 39.1677Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M89.2455 35.7235L87.6415 39.747L88.4948 39.7441L88.7352 39.1265H90.5533L90.7937 39.7441H91.647L90.046 35.7235H89.2455ZM89.0578 38.3323L89.6677 36.8059L90.26 38.3323H89.0578Z'
          fill='currentColor'
        />
        <path
          d='M93.3419 39.7471V35.7235H93.6088L96.1218 38.2353V35.7147H96.9252V39.7383H96.632L94.1454 37.2441V39.7383L93.3419 39.7471Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M100.242 35.7235L98.6406 39.747L99.4939 39.7441L99.7344 39.1265H101.552L101.793 39.7441H102.646L101.045 35.7235H100.242ZM100.057 38.3323L100.667 36.8059L101.259 38.3323H100.057Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M104.341 35.7206V39.7471H105.886C107.134 39.7491 107.757 39.0785 107.757 37.7353C107.757 36.3921 107.134 35.7206 105.886 35.7206H104.341ZM106.954 37.7353C106.954 38.5382 106.596 38.9441 105.886 38.9441H105.142V36.5294H105.886C106.596 36.5294 106.954 36.9323 106.954 37.7353Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M111.106 35.7235L109.502 39.747L110.358 39.7441L110.599 39.1265H112.417L112.657 39.7441H113.508L111.907 35.7235H111.106ZM110.918 38.3323L111.528 36.8059L112.121 38.3323H110.918Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_619_288'>
          <rect width={156} height={40} fill='currentColor' />
        </clipPath>
      </defs>
    </svg>
  ),
  sundial: (props: IconProps) => (
    <svg
      viewBox='0 0 45 40'
      fill='none'
      {...props}
    >
      <g clipPath='url(#clip0_619_189)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M2.39369 36.0306C1.76608 35.8701 1.16765 35.7241 1.16765 35.2716C1.16765 34.8484 1.56174 34.5565 2.13097 34.5565C2.74399 34.5565 3.29862 34.7754 3.67811 35.1841L3.7219 35.2425L4.27654 34.5273L4.23275 34.4835C3.7219 33.958 3.0359 33.6953 2.18935 33.6953C1.0217 33.6953 0.175148 34.3813 0.175148 35.33C0.175148 36.4832 1.24063 36.7604 2.10178 36.9941H2.13097C2.81697 37.1691 3.41539 37.3296 3.41539 37.8551C3.41539 38.2346 3.10888 38.6433 2.27693 38.6433C1.40119 38.6433 0.84655 38.1762 0.583827 37.8843L0.54004 37.8259L0 38.5557L0.0291914 38.5995C0.554636 39.1833 1.32821 39.4898 2.24774 39.4898C3.82407 39.4898 4.3933 38.5995 4.3933 37.7675C4.3933 36.5707 3.28403 36.2643 2.39369 36.0306Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.9468 37.169C10.9468 38.1178 10.436 38.6578 9.53102 38.6578C8.62609 38.6578 8.10064 38.1178 8.10064 37.169V33.7828H7.13733V37.1982C7.13733 38.6724 7.99847 39.5191 9.51643 39.5191C11.0198 39.5191 11.8955 38.6725 11.8955 37.1982V33.7974H10.9322V37.169H10.9468Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M18.5365 37.7092L15.632 33.7831H14.6979V39.4023H15.6466V35.3739L18.5949 39.4023H19.4853V33.7831H18.5365V37.7092Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M24.4186 38.5556H23.3385V34.6295H24.4186C25.6008 34.6295 26.3598 35.4029 26.3598 36.5999C26.3598 37.7676 25.5716 38.5556 24.4186 38.5556ZM24.4186 33.783H22.3898V39.4168H24.4186C26.1409 39.4168 27.3377 38.2637 27.3377 36.5999C27.3231 34.9359 26.1263 33.783 24.4186 33.783Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M29.7606 39.4168H30.7093V33.7828H29.7606V39.4168Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M36.7081 37.4173H34.7377L35.7156 34.863L36.7081 37.4173ZM35.1609 33.7831L32.9279 39.4169H34.0079L34.4604 38.2784H37.0146L37.4671 39.4169H38.5472L36.3141 33.7831H35.1609Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M41.8166 38.5556V33.783H40.8679V39.4022H44.3125V38.5556H41.8166Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M6.22968 13.1406C6.37038 17.0557 7.93299 20.7401 10.6701 23.5761C13.395 26.3993 17.0014 28.0892 20.8893 28.3798C20.5183 24.0147 18.986 20.3017 16.437 17.6077C13.8488 14.8726 10.3305 13.3356 6.22968 13.1406ZM22.2452 29.7076L21.5531 29.6861C17.0655 29.547 12.8761 27.6901 9.75643 24.4579C6.63675 21.2257 4.92978 16.973 4.94963 12.4832L4.95255 11.843L5.59272 11.8512C15.1128 11.9731 21.6342 18.7107 22.2068 29.0163L22.2452 29.7076Z'
          fill='currentColor'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M38.6805 11.8516C38.4812 11.8593 33.9669 12.0572 30.5499 13.9281C30.6115 14.3931 30.6531 14.8591 30.6715 15.3259L30.7435 15.2817C33.1906 13.7772 36.5906 13.3086 38.0359 13.1725C37.6802 18.7241 35.3913 22.9351 31.2253 25.6957C29.2245 27.0216 27.2242 27.6937 25.967 28.0163C28.0825 24.023 28.9183 20.3238 29.0276 17.0662C29.0248 17.0659 29.0221 17.0653 29.0193 17.065C29.0256 16.9906 29.0296 16.9164 29.0346 16.8421C29.1114 13.5832 28.4641 10.7754 27.6517 8.57278C25.7906 3.52559 22.7636 0.558577 22.6356 0.43466L22.1863 0L21.7448 0.442395C17.0139 5.18074 15.7918 11.1545 15.5081 13.1134C15.9154 13.3683 16.3099 13.6405 16.69 13.9317L16.6957 13.8624C16.7015 13.7931 17.3097 7.05862 22.1876 1.81264C23.0766 2.81259 25.1294 5.37632 26.4786 9.06232C27.5028 11.8596 27.9281 14.7513 27.743 17.6571C27.5114 21.296 26.3157 24.9759 24.1894 28.5951L23.5401 29.7006L24.8128 29.5471C24.9564 29.5299 28.3677 29.0967 31.8812 26.7843C35.135 24.6428 39.0703 20.4277 39.3397 12.5075L39.3629 11.825L38.6805 11.8516Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_619_189'>
          <rect width={44.4444} height={40} fill='currentColor' />
        </clipPath>
      </defs>
    </svg>
  ),
  versus: (props: IconProps) => (
    <svg
      viewBox='0 0 120 40'
      fill='none'
      {...props}
    >
      <g clipPath='url(#clip0_619_225)'>
        <path
          d='M25.5829 0.571411L17.6629 20.4286L9.78858 0.571411H0.577148L14.2914 33.1943H21.04L34.7943 0.571411H25.5829Z'
          fill='currentColor'
        />
        <path
          d='M27.8686 9.35425L24.1943 39.2285H39.5772L40.0972 35.1028H29.1315L30.3658 25.0457H41.3372L41.8001 21.2114H30.8286L31.7772 13.4742H42.7486L43.2515 9.35425H27.8686Z'
          fill='currentColor'
        />
        <path
          d='M42.5942 31.6114V2.75427H55.6171C58.6457 2.75427 61.8057 3.10284 64.4457 5.73713C65.9142 7.2057 67.1714 9.41142 67.1714 12.8343C67.1714 15.3886 66.3942 16.9886 65.5714 17.9828C64.7085 19.0628 63.28 19.9314 61.5885 20.2743V20.5314C62.1485 20.8343 62.7142 21.2686 63.1028 21.8743L69.5942 31.6114H57.5257L53.3714 23.1771C53.24 22.8743 53.1142 22.7428 52.9828 22.2686L52.8114 22.3543V31.6114H42.5942ZM52.8 15.6057H54.0114C54.6171 15.6057 55.5714 15.52 56.2171 14.9543C56.5657 14.6514 56.9542 14.0914 56.9542 13.1828C56.9542 12.5314 56.7828 11.8857 56.3942 11.4514C56.0457 11.0628 55.4857 10.6743 54.6228 10.6743H52.8057L52.8 15.6057Z'
          fill='currentColor'
        />
        <path
          d='M74.6228 14.1085C73.6686 13.3714 72.6743 12.8114 71.4628 12.8114C69.2571 12.8114 67.96 14.5828 67.96 16.6628C67.96 21.9828 76.0057 23.3257 76.0057 31.2857C76.0057 35.3085 73.6286 38.9428 69.2971 38.9428C67.6971 38.9428 66.3543 38.5542 65.0571 37.56V33.7085C66.2286 34.5714 67.3486 35.2228 68.8228 35.2228C71.1143 35.2228 72.24 33.4057 72.24 31.2857C72.24 25.3142 64.1486 24.4057 64.1486 16.7085C64.1486 12.6 66.2686 9.35425 70.68 9.35425C72.28 9.35425 73.2343 9.57139 74.6628 10.3085L74.6228 14.1085Z'
          fill='currentColor'
        />
        <path
          d='M89.2628 1.86853C86.4914 19.5657 86.1943 20.8628 86.1943 22.3771C86.1943 24.0628 86.9714 24.8457 88.8743 24.8457C89.7371 24.8457 90.6057 24.7142 91.3428 24.0685C91.9943 23.5085 92.5085 22.64 92.8571 20.3485L95.7543 1.87424H107.606L104.577 21.2114C103.194 29.9942 97.0914 35.0114 87.2685 35.0114C78.6571 35.0114 74.1143 31.2057 74.1143 24.28C74.1143 22.0285 74.4628 20.7771 77.4 1.86853H89.2628Z'
          fill='currentColor'
        />
        <path
          d='M115.446 16.4972C113.76 14.2457 111.771 14.0286 110.731 14.0286C107.703 14.0286 106.754 15.9315 106.754 17.4057C106.754 18.0972 106.971 18.7486 107.663 19.3543C108.354 20.0057 109.309 20.3486 111.126 21C113.377 21.7772 115.497 22.56 116.966 23.8972C118.263 25.0629 119.434 27.0115 119.434 29.9543C119.434 35.5772 115.366 39.4286 109.394 39.4286C104.074 39.4286 100.96 36.1829 99.4457 33.9772L103.126 30.4743C104.509 33.2857 107.149 34.3257 109.183 34.3257C111.737 34.3257 113.64 32.7657 113.64 30.3486C113.64 29.3086 113.291 28.4857 112.514 27.7543C111.434 26.76 109.703 26.1943 108.057 25.6343C106.543 25.1143 104.726 24.4229 103.257 23.1257C102.303 22.3029 100.966 20.7029 100.966 17.76C100.966 13.52 103.823 9.28003 110.223 9.28003C112.04 9.28003 115.457 9.6286 118.4 12.6572L115.446 16.4972Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_619_225'>
          <rect width={120} height={40} fill='currentColor' />
        </clipPath>
      </defs>
    </svg>
  )
}