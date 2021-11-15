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
        `Tumour analysis ${tumourAnalysisId} has already had a mutect2 run with its normal analysis ${normalAnalysisId}!`
      );
    }
  }

  return {
    study_id: normalSampleAnalysis.studyId,
    normal_aln_analysis_id: normalAnalysisId,
    tumour_aln_analysis_id: tumourAnalysisId,
    song_url: 'https://song.rdpc-dev.cancercollaboratory.org',
    score_url: 'https://score.rdpc-dev.cancercollaboratory.org',
    cpus: 8,
    mem: 40,
    download: {
      song_cpus: 2,
      song_mem: 2,
      score_cpus: 4,
      score_mem: 10,
    },
    ref_fa: '<SCHEDULED_DIR>/reference/GRCh38_hla_decoy_ebv/GRCh38_hla_decoy_ebv.fa',
    mutect2_scatter_interval_files:
      '<SCHEDULED_DIR>/reference/gatk-resources/mutect2.scatter_by_chr/chr*.interval_list',
    bqsr_apply_grouping_file:
      '<SCHEDULED_DIR>/reference/gatk-resources/bqsr.sequence_grouping_with_unmapped.grch38_hla_decoy_ebv.csv',
    bqsr_recal_grouping_file:
      '<SCHEDULED_DIR>/reference/gatk-resources/bqsr.sequence_grouping.grch38_hla_decoy_ebv.csv',
    germline_resource_vcfs:
      '<SCHEDULED_DIR>/reference/gatk-resources/af-only-gnomad.pass-only.hg38.vcf.gz',
    contamination_variants:
      '<SCHEDULED_DIR>/reference/gatk-resources/af-only-gnomad.pass-only.biallelic.snp.hg38.vcf.gz',
    panel_of_normals: '<SCHEDULED_DIR>/reference/gatk-resources/1000g_pon.hg38.vcf.gz',
    calculateContamination: {
      mem: 10,
    },
    perform_bqsr: false,
    cleanup: true,
    max_retries: 5,
    first_retry_wait_time: 60,
  };
};
