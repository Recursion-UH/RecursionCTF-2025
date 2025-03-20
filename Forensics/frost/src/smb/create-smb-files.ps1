$counter = 1
foreach ($char in 'j4d1nyA_s0aL_f0r3n_b3rb4s1s_AD}'.ToCharArray()) {
    $fileName = "flag-$counter.txt"
    $filePath = Join-Path -Path '.' -ChildPath $fileName
    $char | Out-File -FilePath $filePath -Encoding UTF8
    $counter++
}
