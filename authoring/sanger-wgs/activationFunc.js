module.exports = function (data) {
  const { sampleMatchedAnalysisPairs } = data.data;

  if (sampleMatchedAnalysisPairs.length === 0) {
    return requeue('Expecting single pair of Tumor and Normal analysis!');
  }

  if (sampleMatchedAnalysisPairs.length > 1) {
    return reject('Found more than one pair of tumour-normal for tumour sample!');
  }

  const [{ normalSampleAnalysis, tumourSampleAnalysis }] = sampleMatchedAnalysisPairs;
  const normalAnalysisId = normalSampleAnalysis.analysisId;
  const tumourAnalysisId = tumourSampleAnalysis.analysisId;

  for (const run of tumourSampleAnalysis.completedRuns) {
    if (run.publishedAnalyses.length > 0) {
      return reject(
        `Tumour analysis ${tumourAnalysisId} has already had a sanger wgs run with its normal analysis ${normalAnalysisId}!`
      );
    }
  }

  return {
    study_id: normalSampleAnalysis.studyId,
    normal_aln_analysis_id: normalAnalysisId,
    tumour_aln_analysis_id: tumourAnalysisId,
    song_url: 'https://song.rdpc-dev.cancercollaboratory.org',
    score_url: 'https://score.rdpc-dev.cancercollaboratory.org',
    cpus: 2,
    mem: 6,
    download: {
      song_cpus: 2,
      song_mem: 2,
      score_cpus: 4,
      score_mem: 10,
    },
    sangerWgsVariantCaller: {
      cpus: 8,
      mem: 40,
      pindelcpu: 8,
      exclude:
        'chr1,chr2,chr3,chr4,chr5,chr6,chr7,chr8,chr9,chr10,chr11,chr12,chr13,chr14,chr15,chr16,chr17,chr18,chr19,chr20,chr22,chrX,chrY,chrUn%,HLA%,%_alt,%_random,chrM,chrEBV',
      ref_genome_tar:
        '<SCHEDULED_DIR>/reference/sanger-variant-calling/core_ref_GRCh38_hla_decoy_ebv.tar.gz',
      vagrent_annot:
        '<SCHEDULED_DIR>/reference/sanger-variant-calling/VAGrENT_ref_GRCh38_hla_decoy_ebv_ensembl_91.tar.gz',
      ref_snv_indel_tar:
        '<SCHEDULED_DIR>/reference/sanger-variant-calling/SNV_INDEL_ref_GRCh38_hla_decoy_ebv-fragment.tar.gz',
      ref_cnv_sv_tar:
        '<SCHEDULED_DIR>/reference/sanger-variant-calling/CNV_SV_ref_GRCh38_hla_decoy_ebv_brass6+.tar.gz',
      qcset_tar:
        '<SCHEDULED_DIR>/reference/sanger-variant-calling/qcGenotype_GRCh38_hla_decoy_ebv.tar.gz',
    },
    generateBas: {
      cpus: 6,
      mem: 32,
      ref_genome_fa: '<SCHEDULED_DIR>/reference/GRCh38_hla_decoy_ebv/GRCh38_hla_decoy_ebv.fa',
    },
    repackSangerResults: {
      cpus: 2,
      mem: 4,
    },
    prepSangerSupplement: {
      cpus: 2,
      mem: 8,
    },
    cavemanVcfFix: {
      cpus: 2,
      mem: 16,
    },
    extractSangerCall: {
      cpus: 2,
      mem: 4,
    },
    payloadGenVariantCall: {
      cpus: 2,
      mem: 8,
    },
    prepSangerQc: {
      cpus: 2,
      mem: 8,
    },
    upload: {
      song_cpus: 2,
      song_mem: 2,
      score_cpus: 4,
      score_mem: 10,
    },
    cleanup: true,
    max_retries: 5,
    first_retry_wait_time: 60,
  };
};
